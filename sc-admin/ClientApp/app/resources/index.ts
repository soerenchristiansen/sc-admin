import { FrameworkConfiguration, PLATFORM } from "aurelia-framework";

export function configure(config: FrameworkConfiguration) {
    config.globalResources([
        PLATFORM.moduleName('./value-converters/generic-filter'),
        PLATFORM.moduleName('./elements/loading-indicator'),
        PLATFORM.moduleName('./elements/chip/chip'),
        PLATFORM.moduleName('./elements/chip/chips'),
        PLATFORM.moduleName('./elements/spinner/spinner'),
        PLATFORM.moduleName('./elements/breadcrumbs/breadcrumbs'),
        PLATFORM.moduleName('./value-converters/blob-to-url'),
        PLATFORM.moduleName('./value-converters/files-to-array')
    ]);
}