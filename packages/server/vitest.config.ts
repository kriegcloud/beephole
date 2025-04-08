import { type UserConfigExport, mergeConfig } from "vitest/config";
import shared from "../../vitest.shared";

const config: UserConfigExport = {};

export default mergeConfig(shared, config);
