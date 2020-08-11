import { addDecorator } from "@storybook/react";

import StyleDecorator from "./StyleDecorator";
import NotificationsDecorator from "./NotificationsDecorator";

addDecorator(NotificationsDecorator);
addDecorator(StyleDecorator);
