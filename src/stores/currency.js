import { defineStore } from 'pinia';
import axios from 'axios';
import { getCurrentInstance } from 'vue';

export const useCurrencyStore = defineStore('currency', {
	state: () => ({
		currencyErrors: [],
		currencyResults: null,
		currencySelectError: '',
		availableCurrencies: [],
		reportRequestResult: ''
	}),
	getters: {
		errors: (state) => state.currencyErrors,
		results: (state) => state.currencyResults,
		currencyError: (state) => state.currencySelectError,
		currencies: (state) => state.availableCurrencies,
		reportRequestResult: (state) => state.reportRequestResult
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
		},
		handleOpenRequestReportDialog(dialogs) {
			dialogs.requestReportDialog = true;
		},
		async handleRequestReport(data) {
			try {
				const response = await axios.post('/api/store-request', {
					currencies: data.targetCurrency,
					range: data.range
				});


			} catch (error) {
				// TODO: For now console log errors, look at detailed exception handling later
				console.log(error);
			}

		},
		async getCurrencies() {
			try {
				const response = await axios.get('/api/currencies');
				let currencies = response.data;

				currencies.forEach((currency) => {
					this.availableCurrencies.push({
						text: currency.code + ' - ' + currency.name,
						value: currency.code
					});
				});
			} catch (error) {
				console.log(error);
			}
		}
	}
});