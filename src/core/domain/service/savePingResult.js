module.exports = ({ EndpointStatusRepository }) => ({ endpointStatus, pingResult }) => {
	const status = pingResult.alive;
	const address = pingResult.numeric_host;
	const time = pingResult.time;
	endpointStatus.updateFromPing({ status, address, time });
	return EndpointStatusRepository.save(endpointStatus);
}