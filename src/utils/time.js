const getCurrentVietnameseTime = () => {
  // Array of Vietnamese names for days and months
  const vietnameseDays = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];
  const vietnameseMonths = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  // Get current date and time
  const currentDate = new Date();

  // Extract day, month, year, hour, and minute
  const dayOfWeek = vietnameseDays[currentDate.getDay()];
  const dayOfMonth = currentDate.getDate();
  const month = vietnameseMonths[currentDate.getMonth()];
  const year = currentDate.getFullYear();
  let hour = currentDate.getHours();
  const minute = currentDate.getMinutes();

  // Determine whether it's AM or PM
  const period = hour >= 12 ? "PM" : "AM";

  // Convert hour to 12-hour format
  hour = hour % 12;
  hour = hour ? hour : 12; // If hour is 0, set it to 12

  // Format minute with leading zero if needed
  const formattedMinute = minute < 10 ? "0" + minute : minute;

  // Construct the time string
  const currentTime = `${dayOfWeek}, ${dayOfMonth} ${month} Năm ${year} ${hour}:${formattedMinute} ${period}`;

  return currentTime;
};

const convertUTCtoAsianTime = (utcTime) => {
  let date = new Date(utcTime);

  // Thay đổi múi giờ bằng cách cộng thêm 7 giờ
  //   date.setHours(date.getHours() + 7);

  // Định dạng thời gian theo định dạng mong muốn
  let options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  let formatter = new Intl.DateTimeFormat("en-GB", options);
  let localTime = formatter.format(date).replace(",", "");
  return localTime;
};

export { getCurrentVietnameseTime, convertUTCtoAsianTime };
