import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import EasyPost from '@easypost/api';
import { EASYPOST_PRODUCTION_API_KEY } from '$env/static/private';

const client = new EasyPost(EASYPOST_PRODUCTION_API_KEY || '');

export const POST: RequestHandler = async ({ request }) => {
	try {
		const shipmentData = await request.json();

		// Validate required fields
		if (
			!shipmentData.origin?.streetAddress ||
			!shipmentData.destination?.streetAddress ||
			!shipmentData.parcel?.weight
		) {
			return json({ error: 'Missing required fields' }, { status: 400 });
		}

		// Create addresses
		const toAddress = await client.Address.create({
			street1: shipmentData.destination.streetAddress,
			street2: shipmentData.destination.streetAddress2 || undefined,
			city: shipmentData.destination.city,
			state: shipmentData.destination.stateProvince,
			zip: shipmentData.destination.zipCode,
			country: shipmentData.destination.country || 'US'
		});

		const fromAddress = await client.Address.create({
			street1: shipmentData.origin.streetAddress,
			street2: shipmentData.origin.streetAddress2 || undefined,
			city: shipmentData.origin.city,
			state: shipmentData.origin.stateProvince,
			zip: shipmentData.origin.zipCode,
			country: shipmentData.origin.country || 'US'
		});

		// Create parcel
		const parcel = await client.Parcel.create({
			length: parseFloat(shipmentData.parcel.length) || undefined,
			width: parseFloat(shipmentData.parcel.width) || undefined,
			height: parseFloat(shipmentData.parcel.height) || undefined,
			weight: parseFloat(shipmentData.parcel.weight)
		});
		// Create shipment
		const shipment = await client.Shipment.create({
			to_address: toAddress,
			from_address: fromAddress,
			parcel: parcel,
			carrier_accounts: shipmentData.carrier_accounts
		});

		// Return rates
		return json({
			success: true,
			rates: shipment.rates,
			shipment_id: shipment.id
		});
	} catch (error: any) {
		console.error('EasyPost error:', error);
		return json(
			{
				error: error.message || 'Failed to get shipping rates',
				details: error.errors || undefined
			},
			{ status: 500 }
		);
	}
};

