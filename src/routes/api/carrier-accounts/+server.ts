import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import EasyPost from '@easypost/api';
import { EASYPOST_PRODUCTION_API_KEY } from '$env/static/private';

const client = new EasyPost(EASYPOST_PRODUCTION_API_KEY || '');

export const GET: RequestHandler = async () => {
	try {
		const carrierAccounts = await client.CarrierAccount.all();

		// Format carrier accounts for the frontend
		// carrierAccounts is already an array of CarrierAccount objects
		const accountsArray = Array.isArray(carrierAccounts) ? carrierAccounts : [];
		const formattedAccounts = accountsArray.map((account: any) => ({
			id: account.id,
			type: account.type,
			description: account.description || undefined,
			readable: account.readable || account.type
		}));

		return json({
			success: true,
			carrierAccounts: formattedAccounts
		});
	} catch (error: any) {
		console.error('EasyPost error:', error);
		return json(
			{
				error: error.message || 'Failed to fetch carrier accounts',
				details: error.errors || undefined
			},
			{ status: 500 }
		);
	}
};

