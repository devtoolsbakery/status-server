import {default as WebApiApp } from '../src/core/infrastructure/application/WebApi/Application';
import { default as HealthCheckerApp } from '../src/core/infrastructure/application/HealthChecker/Application';

new WebApiApp().run();
new HealthCheckerApp().run()
