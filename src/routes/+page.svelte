<script lang="ts">
	import Address from '$lib/Address.svelte';
	import Parcel from '$lib/Parcel.svelte';
	import CarrierAccountSelection from '$lib/CarrierAccountSelection.svelte';
	import { onMount } from 'svelte';

	let shipmentData = $state({
		origin: {
			streetAddress: '',
			streetAddress2: '',
			city: '',
			stateProvince: '',
			zipCode: '',
			country: ''
		},
		return: {
			streetAddress: '',
			streetAddress2: '',
			city: '',
			stateProvince: '',
			zipCode: '',
			country: ''
		},
		destination: {
			streetAddress: '',
			streetAddress2: '',
			city: '',
			stateProvince: '',
			zipCode: '',
			country: ''
		},
		parcel: {
			weight: '',
			length: '',
			width: '',
			height: ''
		},
		carrier_accounts: []
	});

	let isChecked = $state(false);
	let loading = $state(false);
	let rates = $state<any[] | null>(null);
	let error = $state<string | null>(null);
	let carrierAccounts = $state<any[]>([]);
	let loadingCarriers = $state(false);

	function handleDifferentReturnAddress(event: Event) {
		event.preventDefault();
		isChecked = !isChecked;
	}

	function handleToggle(event: any) {
		isChecked = event.detail;
	}

	async function loadCarrierAccounts() {
		loadingCarriers = true;
		try {
			const response = await fetch('/api/carrier-accounts');
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || 'Failed to load carrier accounts');
			}

			carrierAccounts = data.carrierAccounts || [];
		} catch (err: any) {
			console.error('Error loading carrier accounts:', err);
			// Don't show error to user, just log it
		} finally {
			loadingCarriers = false;
		}
	}

	onMount(() => {
		loadCarrierAccounts();
	});

	async function getRates() {
		loading = true;
		error = null;
		rates = null;

		try {
			const response = await fetch('/api/rates', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(shipmentData)
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || 'Failed to get rates');
			}

			rates = data.rates || [];
		} catch (err: any) {
			error = err.message || 'An error occurred while fetching rates';
			console.error('Error fetching rates:', err);
		} finally {
			loading = false;
		}
	}
</script>

<div class="page-container">
	<div class="left-column">
		<Address
			type={'origin'}
			{isChecked}
			on:toggle={handleToggle}
			bind:address={shipmentData.origin}
		/>
		{#if isChecked}
			<Address type={'return'} bind:address={shipmentData.return} />
		{/if}
		<Address type={'destination'} bind:address={shipmentData.destination} />
		<Parcel bind:parcel={shipmentData.parcel} />
		<CarrierAccountSelection
			bind:carrierAccounts
			bind:selectedAccounts={shipmentData.carrier_accounts}
		/>
	</div>

	<div class="right-column">
		<div class="button-container">
			<button onclick={getRates} disabled={loading}>
				{loading ? 'Loading...' : 'Get Rates'}
			</button>
		</div>

		{#if error}
			<div class="error-container">
				<p class="error-message">{error}</p>
			</div>
		{/if}

		{#if rates && rates.length > 0}
			<div class="rates-container">
				<h2>Available Rates</h2>
				<div class="rates-list">
					{#each rates as rate}
						<div class="rate-card">
							<div class="rate-header">
								<h3>{rate.service}</h3>
								<span class="rate-price">${rate.rate}</span>
							</div>
							<p class="rate-carrier">{rate.carrier}</p>
							{#if rate.est_delivery_days}
								<p class="rate-delivery">Est. delivery: {rate.est_delivery_days} days</p>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.page-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		max-width: 1400px;
		margin: 0 auto;
		padding: 2rem;
	}

	.left-column {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.right-column {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		position: sticky;
		top: 2rem;
		align-self: start;
		max-height: calc(100vh - 4rem);
		overflow-y: auto;
	}

	.button-container {
		display: flex;
		justify-content: center;
		padding: 0;
	}

	button {
		padding: 0.875rem 1.5rem;
		background: #4a90e2;
		color: white;
		border: none;
		border-radius: 4px;
		font-size: 1rem;
		font-weight: 500;
		cursor: pointer;
		transition: background 0.2s;
	}

	button:hover {
		background: #357abd;
	}

	button:active {
		transform: translateY(1px);
	}

	button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.error-container {
		padding: 1rem 2rem;
		background: #fee;
		border: 1px solid #fcc;
		border-radius: 4px;
	}

	.error-message {
		color: #c33;
		margin: 0;
	}

	.rates-container {
		padding: 2rem;
		background: white;
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.rates-container h2 {
		margin: 0 0 1.5rem 0;
		color: #333;
		font-size: 1.5rem;
	}

	.rates-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.rate-card {
		padding: 1rem;
		border: 1px solid #ddd;
		border-radius: 4px;
		background: #f9f9f9;
	}

	.rate-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.5rem;
	}

	.rate-header h3 {
		margin: 0;
		color: #333;
		font-size: 1.1rem;
	}

	.rate-price {
		font-size: 1.25rem;
		font-weight: 600;
		color: #4a90e2;
	}

	.rate-carrier {
		margin: 0.25rem 0;
		color: #666;
		font-size: 0.9rem;
	}

	.rate-delivery {
		margin: 0.25rem 0 0 0;
		color: #666;
		font-size: 0.85rem;
	}

	@media (max-width: 1024px) {
		.page-container {
			grid-template-columns: 1fr;
		}

		.right-column {
			position: static;
			max-height: none;
		}
	}
</style>
