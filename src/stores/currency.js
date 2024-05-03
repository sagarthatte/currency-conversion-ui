import { defineStore } from 'pinia';
import axios from 'axios';
import { getCurrentInstance } from 'vue';

export const useCurrencyStore = defineStore('currency', {
	state: () => ({
		currencyErrors: [],
		currencyResults: null,
		currencySelectError: '',
		availableCurrencies: [],
		requestResults: '',
		historicalReports: {},
		selectedReport: {}
	}),
	getters: {
		errors: (state) => state.currencyErrors,
		results: (state) => state.currencyResults,
		currencyError: (state) => state.currencySelectError,
		currencies: (state) => state.availableCurrencies,
		reportResults: (state) => state.requestResults,
		reports: (state) => state.historicalReports,
		currentReport: (state) => state.selectedReport,
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
			this.requestResults = '';
			dialogs.requestReportDialog = true;
		},
		// TODO: Create method to refresh form data when certain actions happen i.e. dialog close.
		async handleRequestReport(data, dialogs) {
			try {
				const response = await axios.post('/api/store-request', {
					currencies: data.targetCurrency,
					range: data.range
				});

				if (response.data.success == true) {
					this.requestResults = response.data.message;
					dialogs.requestReportDialog = false;
				}
				

			} catch (error) {
				// TODO: For now console log errors, look at detailed exception handling later
				console.log(error);
			}

		},
		formatRange(range) {
			let rangeArr = range.split('_');
			return rangeArr[0].charAt(0).toUpperCase() + rangeArr[0].slice(1) + ' ' + rangeArr[1].charAt(0).toUpperCase() + rangeArr[1].slice(1);
		},
		async getHistoricalReports() {
			this.historicalReports = {};
			try {
				const response = await axios.get('/api/historical-reports');
				response.data.forEach((record) => {
					
					this.historicalReports[record.id] = {
						'reportId': record.id,
						'targetCurrency': record.currency,
						'range': this.formatRange(record.range),
						'interval': record.interval.charAt(0).toUpperCase() + record.interval.slice(1),
						'requestedAt': record.request_at,
						'reportData': Object.keys(record.response_data).length ? JSON.parse(record.response_data) : record.response_data,
						'responseAt': record.response_at,
						'status': record.status.charAt(0).toUpperCase() + record.status.slice(1)
					}
				});
				//this.historicalReports = response.data;
			} catch (error) {
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
		},
		displayReportDetails (reportId, dialogs) {

			const selectedReportDetails = this.historicalReports[reportId];
			if (Object.keys(selectedReportDetails).length) {
				this.selectedReport = selectedReportDetails;
				dialogs.reportDetailsDialog = true;
			}
			
		}
	}
});