module.exports = ({ EndpointStatusRepositoryImpl }) => class EndpointStatusRepository {
	
	static _getInstance() {
		return EndpointStatusRepositoryImpl.getInstance();
	}

	static save(endpointStatus) {
		this._getInstance().save(endpointStatus);
	}
}