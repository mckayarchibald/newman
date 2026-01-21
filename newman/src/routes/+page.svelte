<script lang="ts">
	import { AddressInput } from '$lib';

	let destination_address = {
		street: '',
		city: '',
		state: '',
		postalCode: '',
		country: ''
	};

	let origin_address = {
		street: '',
		city: '',
		state: '',
		postalCode: '',
		country: ''
	};

    let parcel ={
        length: '',
        width: '',
        height: '',
        weight: ''
    };
</script>

<div class="container">
    	<AddressInput bind:address={origin_address} label="Origin Address" required={true} />

	<AddressInput bind:address={destination_address} label="Destination Address" required={true} />
    <div class="parcel-input">
        <fieldset>
            <legend>Parcel Information</legend>
            <div class="form-row">
                <div class="form-group">
                    <label for="length">Length (inches)</label>
                    <input id="length" type="number" bind:value={parcel.length} placeholder="Length" />
                </div>
                <div class="form-group">
                    <label for="width">Width (inches)</label>
                    <input id="width" type="number" bind:value={parcel.width} placeholder="Width" />
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="height">Height (inches)</label>
                    <input id="height" type="number" bind:value={parcel.height} placeholder="Height" />
                </div>
                <div class="form-group">
                    <label for="weight">Weight (lbs)</label>
                    <input id="weight" type="number" bind:value={parcel.weight} placeholder="Weight" />
                </div>
            </div>
        </fieldset>
    </div>
	<div class="preview">
		<h2>Address Data</h2>
		<div class="address-section">
			<h3>Destination</h3>
			<pre>{JSON.stringify(destination_address, null, 2)}</pre>
		</div>
		<div class="address-section">
			<h3>Origin</h3>
			<pre>{JSON.stringify(origin_address, null, 2)}</pre>
		</div>
        		<div class="address-section">
			<h3>Parcel</h3>
			<pre>{JSON.stringify(parcel, null, 2)}</pre>
		</div>
	</div>
</div>

<style>
	.container {
		max-width: 600px;
		margin: 0 auto;
		padding: 20px;
	}

	h1 {
		margin-bottom: 20px;
	}

	fieldset {
		border: 1px solid #ccc;
		border-radius: 4px;
		padding: 16px;
		margin: 0 0 20px 0;
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

	.preview {
		margin-top: 40px;
		padding: 16px;
		background-color: #f5f5f5;
		border-radius: 4px;
	}

	.address-section {
		margin-bottom: 20px;
	}

	.address-section:last-child {
		margin-bottom: 0;
	}

	h3 {
		margin-top: 0;
		margin-bottom: 10px;
		font-size: 0.95rem;
		color: #666;
	}

	pre {
		margin: 0;
		font-size: 0.9rem;
		white-space: pre-wrap;
	}

	.address-section {
		margin-bottom: 20px;
	}

	.address-section:last-child {
		margin-bottom: 0;
	}

	h3 {
		margin-top: 0;
		margin-bottom: 10px;
		font-size: 0.95rem;
		color: #666;
	}

	pre {
		margin: 0;
		font-size: 0.9rem;
		white-space: pre-wrap;
	}
</style>