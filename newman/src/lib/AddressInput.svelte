<script lang="ts">
	export let address = {
		street: '',
		city: '',
		state: '',
		postalCode: '',
		country: ''
	};

	export let label = 'Address';
	export let showCountry = true;
	export let required = false;
</script>

<div class="address-input">
	<fieldset>
		<legend>{label}</legend>

		<div class="form-group">
			<label for="street">Street Address {required ? '*' : ''}</label>
			<input
				id="street"
				type="text"
				placeholder="Street address"
				bind:value={address.street}
				{required}
				aria-required={required}
			/>
		</div>

		<div class="form-row">
			<div class="form-group">
				<label for="city">City {required ? '*' : ''}</label>
				<input
					id="city"
					type="text"
					placeholder="City"
					bind:value={address.city}
					{required}
					aria-required={required}
				/>
			</div>

			<div class="form-group">
				<label for="state">State/Province {required ? '*' : ''}</label>
				<input
					id="state"
					type="text"
					placeholder="State/Province"
					bind:value={address.state}
					{required}
					aria-required={required}
				/>
			</div>
		</div>

		<div class="form-row">
			<div class="form-group">
				<label for="postalCode">Postal Code {required ? '*' : ''}</label>
				<input
					id="postalCode"
					type="text"
					placeholder="Postal code"
					bind:value={address.postalCode}
					{required}
					aria-required={required}
				/>
			</div>

			{#if showCountry}
				<div class="form-group">
					<label for="country">Country {required ? '*' : ''}</label>
					<input
						id="country"
						type="text"
						placeholder="Country"
						bind:value={address.country}
						{required}
						aria-required={required}
					/>
				</div>
			{/if}
		</div>
	</fieldset>
</div>

<style>
	.address-input {
		width: 100%;
	}

	fieldset {
		border: 1px solid #ccc;
		border-radius: 4px;
		padding: 16px;
		margin: 0;
	}

	legend {
		padding: 0 8px;
		font-weight: 600;
		font-size: 1rem;
	}

	.form-group {
		margin-bottom: 16px;
	}

	.form-group:last-child {
		margin-bottom: 0;
	}

	label {
		display: block;
		margin-bottom: 6px;
		font-weight: 500;
		font-size: 0.95rem;
	}

	input {
		width: 100%;
		padding: 10px;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-size: 1rem;
		font-family: inherit;
		transition: border-color 0.2s;
	}

	input:focus {
		outline: none;
		border-color: #0066cc;
		box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
	}

	input:invalid {
		border-color: #dc2626;
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 16px;
	}

	@media (max-width: 640px) {
		.form-row {
			grid-template-columns: 1fr;
		}
	}
</style>
