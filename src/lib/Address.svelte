<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	function toggle(event: any) {
		const value = event.target.checked;
		dispatch('toggle', value); // send event up to parent
	}
	type AddressType = 'destination' | 'origin' | 'return';

	type AddressData = {
		streetAddress: string;
		streetAddress2: string;
		city: string;
		stateProvince: string;
		zipCode: string;
		country: string;
	};

	let {
		type = 'destination',
		isChecked = false,
		address = $bindable({
			streetAddress: '',
			streetAddress2: '',
			city: '',
			stateProvince: '',
			zipCode: '',
			country: ''
		})
	}: {
		type?: AddressType;
		isChecked?: boolean;
		address?: AddressData;
	} = $props();

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		console.log('Address submitted:', address);
	}

	const addressType: Record<AddressType, string> = {
		destination: 'Destination Address',
		origin: 'Origin Address',
		return: 'Return Address'
	};
</script>

<div class="form-container">
	<h1>{addressType[type]}</h1>
	<form onsubmit={handleSubmit}>
		<div class="form-group">
			<label for="street-address">Street 1</label>
			<input
				type="text"
				id="street-address"
				bind:value={address.streetAddress}
				placeholder="123 Main St"
				required
			/>
		</div>

		<div class="form-group">
			<label for="street-address-2">Street 2</label>
			<input
				type="text"
				id="street-address-2"
				bind:value={address.streetAddress2}
				placeholder="123 Main St"
			/>
		</div>

		<div class="form-group">
			<label for="city">City</label>
			<input type="text" id="city" bind:value={address.city} placeholder="New York" required />
		</div>

		<div class="form-row">
			<div class="form-group">
				<label for="state">State/Province</label>
				<input
					type="text"
					id="state"
					bind:value={address.stateProvince}
					placeholder="NY"
					required
				/>
			</div>

			<div class="form-group">
				<label for="zip-code">Postal Code</label>
				<input
					type="text"
					id="zip-code"
					bind:value={address.zipCode}
					placeholder="10001"
					required
				/>
			</div>
		</div>

		<div class="form-group">
			<label for="country">Country</label>
			<input
				type="text"
				id="country"
				bind:value={address.country}
				placeholder="United States"
				required
			/>
		</div>
	</form>
	{#if type === 'origin'}
		<div class="checkbox-group">
			<label for="is-default">Different return address</label>
			<input type="checkbox" id="is-default" bind:checked={isChecked} onchange={toggle} />
		</div>
	{/if}
</div>

<style>
	.form-container {
		max-width: 600px;
		margin: 2rem auto;
		padding: 2rem;
		background: white;
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	h1 {
		margin: 0 0 2rem 0;
		color: #333;
		font-size: 2rem;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	label {
		font-weight: 500;
		color: #555;
		font-size: 0.9rem;
	}

	input {
		padding: 0.75rem;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-size: 1rem;
		transition: border-color 0.2s;
	}

	input:focus {
		outline: none;
		border-color: #4a90e2;
		box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
	}

	input::placeholder {
		color: #999;
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
		margin-top: 0.5rem;
	}

	button:hover {
		background: #357abd;
	}

	button:active {
		transform: translateY(1px);
	}

	.checkbox-group {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-top: 1rem;
	}

	.checkbox-group label {
		margin: 0;
		cursor: pointer;
	}

	.checkbox-group input[type='checkbox'] {
		width: auto;
		cursor: pointer;
	}
</style>
