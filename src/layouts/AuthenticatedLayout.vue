<script setup>
	import { ref } from 'vue';
	import { useCurrencyStore } from '../stores/currency';

	const currencyStore = useCurrencyStore();

	const toCurrencies = ref([
		'AUD', 'NZD', 'INR', 'AED', 'GBP', 'EUR'
	]);

	const fromCurrency = ref(['USD']);

	const currencyConvertForm = ref({
		baseCurrency: 'USD',
		targetCurrency: [],
		amount: 1
	});

	// const completedReports = ref([])
</script>

<template>
	<v-container>
		<v-card variant="elevated" elevation="5">
			<v-card-title class="text-left ml-2">Currency Conversion</v-card-title>
			<v-divider></v-divider>
			<v-form @submit.prevent="currencyStore.handleCurrencyConvert(currencyConvertForm)">
				<v-card-text>
					<v-row>
						<v-col cols="4">
							<div class="text-left font-weight-medium">Amount</div>
							<v-text-field v-model="currencyConvertForm.amount" type="number" />
						</v-col>
						<v-col cols="2" />
						<v-col cols="6">
							<div class="text-left font-weight-medium">From</div>
							<v-select v-model="currencyConvertForm.baseCurrency" readonly />
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="6">
						</v-col>
						<v-col cols="6">
							<div v-if="currencyStore.currencySelectError" class="text-left mb-2">
								<span class="text-red">{{ currencyStore.currencySelectError }}</span>
							</div>
							<div class="text-left font-weight-medium">To</div>
							<v-select 
								name="toCurrency" v-model="currencyConvertForm.targetCurrency"
								@update:modelValue="currencyStore.handleToCurrencySelectLimit(currencyConvertForm.targetCurrency)"
								:items="toCurrencies" 
								chips multiple 
							/>
						</v-col>
					</v-row>
					<!-- Results -->
					<template v-if="currencyStore.results">
						<v-divider></v-divider>
						<v-table class="my-4 border--top" density="compact">
							
							<thead>
								<tr>
									<th>
										Base Currency
									</th>
									<th>
										Target Currency
									</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="[key, value] of Object.entries(currencyStore.results.rates)">
									<td class="font-weight-medium text-left">{{ currencyConvertForm.amount }} {{currencyConvertForm.baseCurrency }} equals</td>
									<td class="font-weight-medium text-left">{{ (currencyConvertForm.amount * value).toFixed(2) }} {{  key.slice(-3) }}</td>
								</tr>
							</tbody>
						</v-table>
					</template>
				</v-card-text>
				<v-divider></v-divider>
				<v-card-actions class="justify-end">
					<v-btn variant="tonal" color="primary" type="submit" class="mr-2" :disabled="currencyConvertForm.targetCurrency.length > 5">Convert</v-btn>
				</v-card-actions>
			</v-form>
		</v-card>
	</v-container>
</template>