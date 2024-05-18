import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    const datatables = document.querySelectorAll(".datatable");
    datatables.forEach((datatable) => {
      new simpleDatatables.DataTable(datatable);
    });
  }
}
