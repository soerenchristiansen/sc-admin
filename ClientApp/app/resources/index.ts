import { FrameworkConfiguration, PLATFORM } from "aurelia-framework";

export function configure(config: FrameworkConfiguration) {
    config.globalResources([
        PLATFORM.moduleName('./value-converters/generic-filter'),
        PLATFORM.moduleName('./elements/loading-indicator')
    ]);
}