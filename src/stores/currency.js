import { defineStore } from 'pinia';
import axios from 'axios';

export const useCurrencyStore = defineStore('currency', {
	state: () => ({
		currencyErrors: [],
		currencyResults: null,
		currencySelectError: '',
	}),
	getters: {
		errors: (state) => state.currencyErrors,
		results: (state) => state.currencyResults,
		currencyError: (state) => state.currencySelectError
	},
	actions: {
		async getToken () {
			await axios.get('/sanctum/csrf-cookie');
		},
		async handleCurrencyConvert (form) {
			try {
				this.currencyResults = null;
				const response = await axios.get('/api/convert?base=USD&target=' + form.targetCurrency.toString());
				this.currencyResults = response.data;
				//console.log(response);
			} catch (err) {
				console.log(err);
			} 
		},
		handleToCurrencySelectLimit(selectedCurrencies) {
			this.currencySelectError = '';
			if (selectedCurrencies.length > 5) {
				this.currencySelectError = 'You cannot select more than 5 currencies.';
				selectedCurrencies.pop();
			}
		}
	}
});