<script setup>
	import { onMounted, ref } from 'vue';
	import { useCurrencyStore } from '../stores/currency';

	const currencyStore = useCurrencyStore();

	const toCurrencies = ref([
		'AUD', 'NZD', 'INR', 'AED', 'GBP', 'EUR'
	]);

	let dialogs = ref({
		requestReportDialog: false,
		viewReportsDialog: false
	});

	const currencyConvertForm = ref({
		baseCurrency: 'USD',
		targetCurrency: [],
		amount: 1
	});

	const rangeOptions = ref([
		{
			text: 'Range: 1 Year, Interval: Monthly',
			value: 'one_year'
		},
		{
			text: 'Range: 6 months, Interval: Weekly',
			value: 'six_months'
		},
		{
			text: 'Range: 1 month, Interval: Daily',
			value: 'one_month'
		}
	]);

	const requestReportForm = ref({
		baseCurrency: 'USD',
		targetCurrency: '',
		range: ''
	});

	onMounted(async() => {
		if (!currencyStore.currencies.length) {
			await currencyStore.getCurrencies();
		}
		// Fetch also the reports for this user (pending and completed)
		if (!currencyStore.reports.length) {
			await currencyStore.getHistoricalReports();
		}
	});

</script>

<template>
	<v-card variant="elevated" elevation="5">
		<v-card-title class="text-left ml-2">Live Currency Rates</v-card-title>
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
							:items="currencyStore.currencies" item-title="text" item-value="value"
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

	<!-- Request Report Form -->
	<v-card variant="elevated" elevation="5" class="mt-6">
		<v-card-title class="text-left ml-2">
			<span>Historical Reports</span>
			<v-btn size="small" variant="outlined" color="primary" class="ml-2" absolute right top>
				<v-icon>mdi-refresh</v-icon>
			</v-btn>
		</v-card-title>
		<v-divider></v-divider>
		<v-card-text>
			<!-- TODO: Put badge at top specifying base currency as USD -->
			<v-table class="my-2 border--top" density="compact">
				<thead>
					<tr>
						<th colspan="7">Report Requests</th>
					</tr>
					<tr>
						<th width="5%">ID</th>
						<th class="text-left">Request Date</th>
						<th class="text-center">Range</th>
						<th class="text-center">Interval</th>
						<th>Target Currency</th>
						<th class="text-center">Status</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					<template v-if="Object.keys(currencyStore.reports).length">
						<tr v-for="(report, id) in currencyStore.reports" :key="id" :id="id">
							<td>{{ id }}</td>
							<td class="text-left">{{ report.requestedAt }}</td>
							<td class="text-center">{{ report.range }}</td>
							<td class="text-center">{{ report.interval }}</td>
							<td>{{ report.currency }}</td>
							<td class="text-center">
								<v-chip size="small" label variant="elevated" :color="report.status === 'Completed' ? 'green' : 'orange'">
									{{ report.status }}
								</v-chip>
							</td>
							<td>
								<v-btn variant="plain" color="info" :disabled="report.status === 'Pending'">
									<v-icon small>mdi-eye</v-icon>
								</v-btn>
							</td>
						</tr>
					</template>
					<template v-else>
						<tr>
							<td colspan="6">
								<h5>User does not have any pending or completed historical reports</h5>
							</td>
						</tr>
					</template>
				</tbody>
			</v-table>			
		</v-card-text>
		<v-divider></v-divider>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn variant="tonal" class="mr-2" @click="currencyStore.handleOpenRequestReportDialog(dialogs)" color="primary">Request Report</v-btn>
			<!-- <v-btn variant="tonal" class="mr-2" small color="info" @click="dialogs.viewReportsDialog = true;">View Report</v-btn> -->
		</v-card-actions>
	</v-card>

	<v-dialog v-model="dialogs.viewReportsDialog" max-width="900" min-height="500">
		<v-card>
			<v-card-title class="text-left mr-2">View Report Details</v-card-title>
			<v-divider></v-divider>
			<v-card-text>
				<v-container>
					<template v-if="reportSelected">
						<v-table class="my-2 border--top" density="compact">
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
							<tbody></tbody>
						</v-table>
					</template>
					<template v-else>
						<v-alert
								text="Please select a report to view"
								variant="text"
								type="info"
							/>
					</template>
					
				</v-container>
			</v-card-text>
			<v-divider></v-divider>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn variant="text" class="mr-2" small color="red" @click="dialogs.viewReportsDialog = false;">Close</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>

	<v-dialog v-model="dialogs.requestReportDialog" max-width="700">
		<v-card>
			<v-card-title class="text-left mr-2">Request Report</v-card-title>
			<v-divider></v-divider>
			<v-form @submit.prevent="currencyStore.handleRequestReport(requestReportForm, dialogs)">
				<v-card-text>
					<v-row>
						<v-col cols="12">
							<v-alert
								text="Reports may take upto 15 minutes to be generated."
								variant="tonal"
								type="info"
							></v-alert>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="5">
							<div class="text-left font-weight-medium">Source</div>
							<v-select density="compact" v-model="requestReportForm.baseCurrency" readonly />
						</v-col>
						<v-col cols="2"></v-col>
						<v-col cols="5">
							<div class="text-left font-weight-medium">Target</div>
							<v-select
								density="compact"
								name="toCurrency" v-model="requestReportForm.targetCurrency"
								:items="currencyStore.currencies"
								item-title="text" item-value="value"
							/>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="12">
							<div class="text-left font-weight-medium">Range</div>
							<v-select
								density="compact"
								name="reportRange"
								v-model="requestReportForm.range"
								:items="rangeOptions" item-title="text" item-value="value"
							>
							</v-select>
						</v-col>
					</v-row>
				</v-card-text>
				<v-divider></v-divider>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn variant="tonal" type="submit" color="info" class="mr-2">Create Request</v-btn>
				</v-card-actions>
			</v-form>

		</v-card>
	</v-dialog>
</template>