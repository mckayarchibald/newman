<script lang="ts">
	type ParcelData = {
		weight: string;
		length: string;
		width: string;
		height: string;
	};

	let {
		parcel = $bindable({
			weight: '',
			length: '',
			width: '',
			height: ''
		})
	}: {
		parcel?: ParcelData;
	} = $props();

	let isHovered = $state(false);

	function handleParcelSubmit(event: SubmitEvent) {
		event.preventDefault();
		console.log('Parcel Info:', parcel);
	}
</script>

<div class="parcel-form-container" onmouseenter={() => isHovered = true} onmouseleave={() => isHovered = false}>
	<h2>Parcel Information</h2>
	{#if !isHovered}
		<div class="parcel-display">
			<p>Weight: {parcel.weight} kg</p>
			<p>Dimensions: {parcel.length} × {parcel.width} × {parcel.height} cm</p>
		</div>
	{:else}
		<form onsubmit={handleParcelSubmit}>
			<div class="form-group">
				<label for="weight">Weight (kg)</label>
				<input
					type="number"
					id="weight"
					min="0.01"
					step="0.01"
					bind:value={parcel.weight}
					required
					placeholder="e.g., 2.50"
				/>
			</div>
			<div class="form-row">
				<div class="form-group">
					<label for="length">Length (cm)</label>
					<input
						type="number"
						id="length"
						min="0.01"
						step="0.01"
						bind:value={parcel.length}
						required
						placeholder="e.g., 30"
					/>
				</div>
				<div class="form-group">
					<label for="width">Width (cm)</label>
					<input
						type="number"
						id="width"
						min="0.01"
						step="0.01"
						bind:value={parcel.width}
						required
						placeholder="e.g., 20"
					/>
				</div>
				<div class="form-group">
					<label for="height">Height (cm)</label>
					<input
						type="number"
						id="height"
						min="0.01"
						step="0.01"
						bind:value={parcel.height}
						required
						placeholder="e.g., 10"
					/>
				</div>
			</div>
		</form>
	{/if}
</div>

<style>
	.parcel-form-container {
		max-width: none;
		margin: 0;
		padding: 1.5rem;
		background: white;
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		height: 100%;
	}

	h2 {
		margin: 0 0 2rem 0;
		color: #333;
		font-size: 1.5rem;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.form-row {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	label {
		font-weight: 500;
		color: #444;
	}

	input,
	textarea {
		padding: 0.6rem;
		font-size: 1rem;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	button[type='submit'] {
		padding: 0.75rem;
		background: #0072ee;
		color: white;
		border: none;
		border-radius: 6px;
		font-size: 1rem;
		cursor: pointer;
		margin-top: 1rem;
		transition: background 0.2s;
	}

	button[type='submit']:hover {
		background: #005fcc;
	}

	.parcel-display {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		padding: 1rem 0;
		font-size: 1rem;
		color: #333;
	}

	.parcel-display p {
		margin: 0;
		line-height: 1.4;
	}
</style>
