import { RouterView, RouterLink } from "vue-router";
import { Notifications } from "@kyvg/vue3-notification"

declare module 'vue-router' {
  export interface GlobalComponents {
    RouterView: typeof RouterView;
    RouterLink: typeof RouterLink;
  }
}

declare module '@kyvg/vue3-notification' {
  export interface GlobalComponents {
    Notifications: typeof Notifications
  }
}
