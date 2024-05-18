// tailwind flash messages
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["flash"];

  hide() {
    this.flashTarget.classList.add("hidden");
  }
}
