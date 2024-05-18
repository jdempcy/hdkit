import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  toggle() {
    document.querySelector(".search-bar").classList.toggle("search-bar-show");
  }
}
