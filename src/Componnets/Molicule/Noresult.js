import React from "react";

function Noresult() {
  return (
    <div>
      <div class="noresult">
        <div class="text-center">
          <lord-icon
            src="../../../msoeawqm.json"
            trigger="loop"
            colors="primary:#405189,secondary:#0ab39c"
            style={{ width: "75px", height: "75px" }}
          ></lord-icon>
          <h5 class="mt-2">Sorry! No Result Found</h5>
          <p class="text-muted">
            We've searched more than 150+ Orders We did not find any orders for
            you search.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Noresult;
