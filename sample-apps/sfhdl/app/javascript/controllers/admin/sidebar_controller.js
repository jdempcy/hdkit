import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  toggle() {
    document.querySelector("body").classList.toggle("toggle-sidebar");
  }
}
