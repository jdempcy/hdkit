import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static values = {
    options: Object,
  };

  connect() {
    new Quill(this.element, { ...this.optionsValue });
  }
}
