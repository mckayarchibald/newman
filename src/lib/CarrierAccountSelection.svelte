<script lang="ts">
	type CarrierAccount = {
		id: string;
		type: string;
		description?: string;
		readable?: string;
	};

	let {
		carrierAccounts = $bindable([]),
		selectedAccounts = $bindable<string[]>([])
	}: {
		carrierAccounts?: CarrierAccount[];
		selectedAccounts?: string[];
	} = $props();

	function toggleAccount(accountId: string) {
		if (selectedAccounts.includes(accountId)) {
			selectedAccounts = selectedAccounts.filter((id) => id !== accountId);
		} else {
			selectedAccounts = [...selectedAccounts, accountId];
		}
	}
</script>

<div class="carrier-selection-container">
	<h2>Select Carrier Accounts</h2>
	{#if carrierAccounts.length === 0}
		<p class="no-accounts">No carrier accounts available</p>
	{:else}
		<div class="accounts-grid">
			{#each carrierAccounts as account}
				<button
					type="button"
					class="account-box"
					class:selected={selectedAccounts.includes(account.id)}
					onclick={() => toggleAccount(account.id)}
				>
					<div class="account-content">
						<h3>{account.readable || account.type}</h3>
						{#if account.description}
							<p class="account-description">{account.description}</p>
						{/if}
					</div>
				</button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.carrier-selection-container {
		max-width: none;
		margin: 0;
		padding: 1.5rem;
		background: white;
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		height: 100%;
	}

	h2 {
		margin: 0 0 1.5rem 0;
		color: #333;
		font-size: 1.5rem;
	}

	.no-accounts {
		color: #666;
		text-align: center;
		padding: 2rem;
		margin: 0;
	}

	.accounts-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		gap: 1rem;
	}

	.account-box {
		padding: 1.5rem 1rem;
		border: 2px solid #ddd;
		border-radius: 4px;
		background: white;
		cursor: pointer;
		transition: all 0.2s;
		text-align: center;
		min-height: 100px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.account-box:hover {
		border-color: #4a90e2;
		box-shadow: 0 2px 8px rgba(74, 144, 226, 0.2);
	}

	.account-box.selected {
		background: #4a90e2;
		border-color: #4a90e2;
		color: white;
		box-shadow: 0 2px 8px rgba(74, 144, 226, 0.3);
	}

	.account-content {
		width: 100%;
	}

	.account-box h3 {
		margin: 0 0 0.5rem 0;
		font-size: 1rem;
		font-weight: 600;
		color: inherit;
	}

	.account-box.selected h3 {
		color: white;
	}

	.account-description {
		margin: 0;
		font-size: 0.85rem;
		color: #666;
	}

	.account-box.selected .account-description {
		color: rgba(255, 255, 255, 0.9);
	}
</style>

