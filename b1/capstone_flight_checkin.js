// Dữ liệu đầu vào
const tickets = [
  { pnr: "VN101", passenger: "Nguyen Van A", class: "ECONOMY", flight: "VN210", seat: "12A", status: "BOOKED", baggageWeight: 0, excessFee: 0 },
  { pnr: "VN102", passenger: "Tran Thi B", class: "BUSINESS", flight: "VN210", seat: "02C", status: "BOOKED", baggageWeight: 0, excessFee: 0 },
  { pnr: "VN103", passenger: "Le Van C", class: "ECONOMY", flight: "VN210", seat: "18D", status: "CHECKED_IN", baggageWeight: 18, excessFee: 0 },
  { pnr: "VN104", passenger: "Pham Minh D", class: "BUSINESS", flight: "VN210", seat: "03A", status: "CANCELLED", baggageWeight: 0, excessFee: 0 }
];

function listTickets() {
  console.log("\n=== DANH SÁCH VÉ CHUYẾN BAY ===");
  console.table(tickets.map(t => ({
    "Mã PNR": t.pnr,
    "Hành khách": t.passenger,
    "Hạng vé": t.class,
    "Ghế": t.seat,
    "Trạng thái": t.status,
    "Hành lý (kg)": t.baggageWeight,
    "Phụ phí (VNĐ)": t.excessFee.toLocaleString("vi-VN")
  })));
}

function findTicketByPnr(pnr) {
  if (!pnr) return null;
  return tickets.find(t => t.pnr.toUpperCase() === pnr.trim().toUpperCase()) || null;
}

function calculateExcessBaggageFee(ticketClass, weight) {
  const allowance = ticketClass.toUpperCase() === "BUSINESS" ? 30 : 20;
  const excessWeight = weight - allowance;
  return excessWeight > 0 ? excessWeight * 50000 : 0;
}

function displayBoardingPass(ticket) {
  console.log("\n========================================");
  console.log("            BOARDING PASS               ");
  console.log("========================================");
  console.log(`HÀNH KHÁCH : ${ticket.passenger.toUpperCase()}`);
  console.log(`CHUYẾN BAY : ${ticket.flight}    | GHẾ : ${ticket.seat}`);
  console.log(`HẠNG VÉ    : ${ticket.class}`);
  console.log(`MÃ ĐẶT CHỖ : ${ticket.pnr}`);
  console.log(`HÀNH LÝ    : ${ticket.baggageWeight} kg`);
  if (ticket.excessFee > 0) {
    console.log(`PHỤ THU    : ${ticket.excessFee.toLocaleString("vi-VN")} VNĐ`);
  }
  console.log("========================================\n");
}

function checkIn() {
  const pnr = prompt("Nhập mã PNR cần làm thủ tục:");
  const ticket = findTicketByPnr(pnr);

  if (!ticket) {
    alert("Không tìm thấy mã PNR trong hệ thống!");
    return;
  }

  if (ticket.status === "CHECKED_IN") {
    alert("Hành khách này đã hoàn thành check-in từ trước.");
    return;
  }

  if (ticket.status === "CANCELLED") {
    alert("Vé này đã bị hủy, không thể check-in.");
    return;
  }

  const weightInput = prompt("Nhập khối lượng hành lý ký gửi (kg):");
  const weight = parseFloat(weightInput);

  if (isNaN(weight) || weight < 0) {
    alert("Khối lượng hành lý không hợp lệ!");
    return;
  }

  const excessFee = calculateExcessBaggageFee(ticket.class, weight);
  ticket.baggageWeight = weight;
  ticket.excessFee = excessFee;
  ticket.status = "CHECKED_IN";

  alert(`Check-in thành công! Phụ phí quá cước: ${excessFee.toLocaleString("vi-VN")} VNĐ`);
  displayBoardingPass(ticket);
}

function searchTicket() {
  const keyword = prompt("Nhập mã PNR hoặc tên hành khách cần tra cứu:");
  if (!keyword) return;

  const kw = keyword.trim().toLowerCase();
  const results = tickets.filter(t => 
    t.pnr.toLowerCase().includes(kw) || t.passenger.toLowerCase().includes(kw)
  );

  if (results.length === 0) {
    alert("Không tìm thấy thông tin phù hợp!");
    return;
  }

  console.log(`\n=== KẾT QUẢ TÌM KIẾM CHO: "${keyword}" ===`);
  console.table(results);
}

function cancelTicket() {
  const pnr = prompt("Nhập mã PNR của vé cần hủy:");
  const ticket = findTicketByPnr(pnr);

  if (!ticket) {
    alert("Không tìm thấy mã đặt chỗ!");
    return;
  }

  if (ticket.status === "CANCELLED") {
    alert("Vé này vốn đã ở trạng thái CANCELLED.");
    return;
  }

  const confirmAction = confirm(`Bạn có chắc chắn muốn hủy vé ${ticket.pnr} của khách ${ticket.passenger}?`);
  if (confirmAction) {
    ticket.status = "CANCELLED";
    alert(`Đã hủy vé ${ticket.pnr} thành công.`);
  }
}

function main() {
  let menuChoice;

  do {
    const menuPrompt = 
      "=== HỆ THỐNG QUẦY CHECK-IN SÂN BAY ===\n" +
      "1. Hiển thị danh sách vé chuyến bay\n" +
      "2. Tiếp nhận check-in & cân hành lý\n" +
      "3. Tra cứu vé (PNR / Tên khách)\n" +
      "4. Hủy vé\n" +
      "5. Thoát ca làm việc\n\n" +
      "Nhập lựa chọn của bạn (1-5):";

    menuChoice = prompt(menuPrompt);

    switch (menuChoice) {
      case "1":
        listTickets();
        break;
      case "2":
        checkIn();
        break;
      case "3":
        searchTicket();
        break;
      case "4":
        cancelTicket();
        break;
      case "5":
      case null:
        alert("Đã kết thúc ca làm việc. Tạm biệt!");
        menuChoice = "5";
        break;
      default:
        alert("Lựa chọn không hợp lệ. Vui lòng nhập từ 1 đến 5!");
        break;
    }
  } while (menuChoice !== "5");
}

main();