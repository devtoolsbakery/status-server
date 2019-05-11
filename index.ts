import PingWorker from './src/core/infrastructure/application/PingWorker';
import WebApi from './src/core/infrastructure/application/WebApi';

new PingWorker().run();
new WebApi().run();
