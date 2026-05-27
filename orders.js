// ════════════════════════════════════════
//  orders.js — My Orders page logic
// ════════════════════════════════════════

const TRACKING_STEPS = [
  { label: "Order\nPlaced",       icon: "fa-circle-check" },
  { label: "Confirmed",           icon: "fa-thumbs-up"    },
  { label: "Shipped",             icon: "fa-truck"        },
  { label: "Out for\nDelivery",   icon: "fa-location-dot" },
  { label: "Delivered",           icon: "fa-house"        },
];

// ── Helpers ──────────────────────────────

function getOrders() {
  return JSON.parse(localStorage.getItem("orders")) || [];
}

function saveOrders(orders) {
  localStorage.setItem("orders", JSON.stringify(orders));
}

// ── Build tracking bar HTML ───────────────

function buildTrackingBar(statusIndex) {
  const totalSteps  = TRACKING_STEPS.length;   // 5
  const lastStep    = totalSteps - 1;           // 4

  // Progress line width: 0% at step 0, 100% at step 4
  const pct = statusIndex === 0
    ? 0
    : Math.round((statusIndex / lastStep) * 100);

  let stepsHTML = "";
  TRACKING_STEPS.forEach((step, i) => {
    let dotClass    = "";
    let labelClass  = "";

    if (i < statusIndex) {
      dotClass   = "done";
    } else if (i === statusIndex) {
      dotClass   = "current";
      labelClass = "active-label";
    }

    const icon = i < statusIndex
      ? "fa-check"          // completed → checkmark
      : step.icon;          // pending/current → step icon

    const labelLines = step.label.split("\n");
    const labelText  = labelLines.map(l => `<span>${l}</span>`).join("<br>");

    stepsHTML += `
      <div class="tracking-step">
        <div class="step-dot ${dotClass}">
          <i class="fa-solid ${icon}"></i>
        </div>
        <div class="step-label ${labelClass}">${labelText}</div>
      </div>`;
  });

  return `
    <div class="order-tracking">
      <div class="tracking-label"><i class="fa-solid fa-route"></i>&nbsp; Order Tracking</div>
      <div class="tracking-steps">
        <div class="tracking-progress-line" style="width: calc(${pct}% - 14px)"></div>
        ${stepsHTML}
      </div>
    </div>`;
}

// ── Build one order card HTML ─────────────

function buildOrderCard(order, cardIndex) {
  // Items rows
  let itemsHTML = "";
  order.items.forEach(item => {
    const subtotal = item.price * item.qty;
    itemsHTML += `
      <div class="order-item-row">
        <img src="${item.image}" alt="${item.name}" class="order-item-img" />
        <div class="order-item-info">
          <h4>${item.name}</h4>
          <p>Qty: ${item.qty} &nbsp;·&nbsp; ₹${item.price} each</p>
        </div>
        <div class="order-item-subtotal">₹${subtotal}</div>
      </div>`;
  });

  const trackingHTML = buildTrackingBar(order.statusIndex);
  const statusName   = TRACKING_STEPS[order.statusIndex].label.replace("\n", " ");

  return `
    <div class="order-card" id="order-${order.id}" style="animation-delay:${cardIndex * 0.07}s">

      <!-- Header (click to expand) -->
      <div class="order-header" onclick="toggleCard('${order.id}')">
        <div class="order-meta">
          <span class="order-id"><i class="fa-regular fa-receipt"></i> ${order.id}</span>
          <span class="order-date">${order.date} &nbsp;·&nbsp; ${order.items.length} item${order.items.length !== 1 ? "s" : ""}</span>
        </div>
        <div class="order-header-right">
          <span class="order-total-badge">₹${order.total}</span>
          <i class="fa-solid fa-chevron-down toggle-icon"></i>
        </div>
      </div>

      <!-- Tracking bar (always visible) -->
      ${trackingHTML}

      <!-- Items (collapsible) -->
      <div class="order-items-body">
        ${itemsHTML}
        <div class="order-footer">
          <div class="order-total-line">
            Status: <strong>${statusName}</strong>
          </div>
          <div class="order-total-line">
            Total: <strong>₹${order.total}</strong>
          </div>
          <button class="clear-order-btn" onclick="removeOrder('${order.id}')">
            <i class="fa-solid fa-trash-can"></i> Remove
          </button>
        </div>
      </div>

    </div>`;
}

// ── Toggle expand/collapse ────────────────

function toggleCard(orderId) {
  const card = document.getElementById("order-" + orderId);
  if (card) card.classList.toggle("open");
}

// ── Remove a single order ─────────────────

function removeOrder(orderId) {
  if (!confirm("Remove this order from your history?")) return;
  const orders = getOrders().filter(o => o.id !== orderId);
  saveOrders(orders);
  renderOrders();
}

// ── Clear all orders ──────────────────────

function clearAllOrders() {
  if (!confirm("Clear your entire order history?")) return;
  localStorage.removeItem("orders");
  renderOrders();
}

// ── Main render ───────────────────────────

function renderOrders() {
  const listEl = document.getElementById("orders-list");
  const orders = getOrders();

  if (orders.length === 0) {
    listEl.innerHTML = `
      <div class="empty-orders">
        <i class="fa-solid fa-box-open"></i>
        <p>You haven't placed any orders yet.</p>
        <a href="shop.html" class="btn btn-primary">Start Shopping</a>
      </div>`;
    return;
  }

  let html = `
    <div class="clear-all-row">
      <button class="clear-all-btn" onclick="clearAllOrders()">
        <i class="fa-solid fa-trash-can"></i> Clear all orders
      </button>
    </div>`;

  orders.forEach((order, i) => {
    html += buildOrderCard(order, i);
  });

  listEl.innerHTML = html;
}

// ── Init ──────────────────────────────────
renderOrders();
updateCartCount();