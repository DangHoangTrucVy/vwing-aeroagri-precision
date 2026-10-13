import { CropSolution, NewsArticle, TelemetryMission } from '../types';

export const cropSolutions: CropSolution[] = [
  {
    id: 'durian',
    name: 'Sầu Riêng',
    subName: '(Musang King & Ri6)',
    badge: 'BẬC THẦY TÁN CAO & NHẠY CẢM PHÂN GỐC',
    title: 'Quản Lý Từng Cây Sầu Riêng Bằng Căn Cước Số AI',
    description:
      'Theo dõi chu kỳ làm bông, nuôi trái, tỷ lệ rụng sinh lý và tầm soát hiện tượng xì mủ rễ Phytophthora. Giúp nông hộ giảm 38% chi phí thuốc BVTV và tăng 22% tỷ lệ trái loại 1.',
    stats: [
      { label: 'Năng suất trái xuất khẩu', value: '+22%', isPositive: true },
      { label: 'Lượng thuốc xịt dư thừa', value: '-38%', isPositive: false },
    ],
    pilotPlot: {
      title: 'Khối Vườn Thí Điểm 120ha - Cư M\'gar',
      subtitle: '3,400 cây sầu riêng Ri6 & Monthong gắn thẻ định vị GPS RTK',
      soilMoisture: '68%',
      treeCount: '3,400 gốc định danh',
      gpsStatus: 'RTK Sub-cm',
      image: '/src/assets/images/drone_field_inspection_1791883988716.jpg',
    },
  },
  {
    id: 'coffee',
    name: 'Cà Phê & Hồ Tiêu',
    subName: '(Robusta & Tiêu Vĩnh Linh)',
    badge: 'KIỂM SOÁT THẢM PHỦ & RỆP SÁP RỄ',
    title: 'Bản Đồ Chỉ Số Thủy Vận & Dinh Dưỡng Đất Đồi Dốc',
    description:
      'Định lượng chỉ số thiếu nước mặt tầng sâu và phát hiện sớm hiện tượng vàng lá thối rễ tuyến trùng trên diện rộng. Tối ưu chu kỳ tưới nhỏ giọt tiết kiệm 45% điện nước tưới tiêu.',
    stats: [
      { label: 'Tiết kiệm nước & năng lượng', value: '-45%', isPositive: true },
      { label: 'Tỷ lệ hạt chắc loại A', value: '+18.5%', isPositive: true },
    ],
    pilotPlot: {
      title: 'Nông Trường Cà Phê Chư Prông - Gia Lai',
      subtitle: '85ha Robusta cao sản canh tác theo chuẩn Rainforest Alliance',
      soilMoisture: '54%',
      treeCount: '28,000 bụi cà phê',
      gpsStatus: 'RTK Sub-cm',
      image: '/src/assets/images/orchard_canopy_lidar_1791883989473.jpg',
    },
  },
  {
    id: 'avocado',
    name: 'Bơ Booth & Macca',
    subName: '(Bơ 034, Booth 7 & Macadamia)',
    badge: 'PHÂN TÍCH QUANG HỢP TÁN RẬM',
    title: 'Tối Ưu Tỉa Cành Đoán Sản Lượng Bằng LiDAR 3D',
    description:
      'Mô phỏng 3D thể tích tán để khuyến nghị vị trí tỉa cành tạo tán đón nắng. Dự báo sớm sản lượng thu hoạch trước 45 ngày với sai số dưới 5% phục vụ ký kết hợp đồng xuất khẩu.',
    stats: [
      { label: 'Độ chính xác dự báo sản lượng', value: '96.2%', isPositive: true },
      { label: 'Hiệu quả hấp thu ánh sáng', value: '+31%', isPositive: true },
    ],
    pilotPlot: {
      title: 'Vườn Thực Nghiệm Macca Bảo Lộc - Lâm Đồng',
      subtitle: '64ha Macca và Bơ ghép canh tác theo hướng hữu cơ xuất khẩu Nhật',
      soilMoisture: '62%',
      treeCount: '1,950 cây thụ phấn',
      gpsStatus: 'RTK Sub-cm',
      image: '/src/assets/images/hero_drone_orchard_1791883988500.jpg',
    },
  },
];

export const newsArticles: NewsArticle[] = [
  {
    id: 'vnexpress-01',
    publisher: 'VnExpress Nông Nghiệp',
    date: '18/02/2026',
    title: 'Giải pháp viễn thám số hóa hơn 60.000 ha sầu riêng xuất khẩu Tây Nguyên',
    summary:
      'VWING mang đến lời giải cho việc kiểm soát nấm xì mủ diện rộng mà mắt thường không thể quan sát kịp trên các vùng trồng hàng trăm hecta.',
    category: 'Báo chí chính thống',
    readTime: '4 phút',
    content: [
      'Tại các thủ phủ sầu riêng như Krông Pắc (Đắk Lắk) hay Di Linh (Lâm Đồng), việc canh tác cây ăn trái giá trị cao đang bước vào kỷ nguyên số hóa mạnh mẽ.',
      'Bằng việc triển khai đội bay drone mang cảm biến đa phổ quét 5 dải sóng quang học, hệ thống VWING có thể nhận diện sớm sự suy giảm sắc tố diệp lục khi nấm Phytophthora mới chỉ bắt đầu xâm nhiễm tầng biểu bì rễ và thân.',
      'Điều này giúp nông dân khoanh vùng và dập dịch ngay từ 2-3 cây đầu tiên thay vì phải phun tràn lan hàng hecta, tiết kiệm hàng chục triệu đồng tiền thuốc BVTV mỗi đợt.',
    ],
  },
  {
    id: 'tapchi-nn-02',
    publisher: 'Tạp chí Nông Nghiệp & PTNT',
    date: '12/01/2026',
    title: 'Đột phá mô hình 3D Terrain Follow cho nông nghiệp cây công nghiệp',
    summary:
      'Nghiên cứu ứng dụng radar độ cao vi sai kết hợp cảm biến siêu thanh trên địa hình sườn dốc hiểm trở của vùng cao nguyên.',
    category: 'Nghiên cứu khoa học',
    readTime: '6 phút',
    content: [
      'Khác với ruộng đồng bằng phẳng ở Đồng bằng Sông Cửu Long, địa hình Tây Nguyên đặc trưng bởi các đồi dốc từ 15° đến hơn 40° xen kẽ cây che bóng.',
      'Cơ chế bay bám địa hình thích ứng thời gian thực (Terrain-Follow) của VWING duy trì khoảng cách vòi phun chính xác 1.5m so với ngọn cây trong suốt hành trình bay.',
      'Kết quả đo đạc thực địa cho thấy độ đồng đều của giọt thuốc tăng 88%, giảm thiểu 95% hiện tượng giọt thuốc bay tạt ra ngoài theo gió đồi.',
    ],
  },
  {
    id: 'agritech-asia-03',
    publisher: 'AgriTech Asia Review',
    date: '04/01/2026',
    title: 'Top 10 sáng kiến công nghệ nông nghiệp chính xác nổi bật Đông Nam Á',
    summary:
      'VWING được vinh danh nhờ giải pháp gắn căn cước số GPS RTK cho từng thân cây cổ thụ và cây lâu năm xuất khẩu.',
    category: 'Báo cáo quốc tế',
    readTime: '5 phút',
    content: [
      'Giải thưởng AgriTech Innovation Award 2026 ghi nhận đóng góp của giải pháp gắn thẻ định danh cây trồng thân gỗ của VWING.',
      'Mỗi cây trồng có một hộ chiếu số riêng biệt ghi nhận lịch sử xử lý ra hoa, tỷ lệ đậu quả, chỉ số sinh khối lá và lượng phân vi sinh hấp thụ.',
      'Dữ liệu được lưu trữ trên sổ cái minh bạch, đáp ứng tuyệt đối các tiêu chuẩn kiểm dịch và mã số vùng trồng khắt khe khi xuất khẩu sang Trung Quốc, EU và Hoa Kỳ.',
    ],
  },
  {
    id: 'tuoitre-04',
    publisher: 'Báo Tuổi Trẻ',
    date: '28/01/2026',
    title: 'Số hóa từng thân cây lâu năm: Khi nông dân làm chủ bản đồ đa phổ NDVI',
    summary:
      'Nông hộ Đắk Lắk ứng dụng smartphone kết nối trạm bay VWING để chủ động theo dõi chỉ số diệp lục và khoảng chất của vườn cây mỗi sáng.',
    category: 'Phóng sự đời sống',
    readTime: '3 phút',
    content: [
      'Ông Nguyễn Văn Thắng (xã Ea Yông, huyện Krông Pắc) chia sẻ: "Trước đây mỗi lần nghi ngờ cây bị bệnh là phải lội bộ khắp 8ha đồi để vạch từng chùm lá. Giờ chỉ cần mở ứng dụng là thấy ngay cây số 142 ở hàng 18 đang bị stress quang học, ra tận nơi kiểm tra đúng y như rằng xì mủ dưới cổ rễ."',
      'Việc minh bạch hóa dữ liệu còn giúp các hợp tác xã dễ dàng tiếp cận các nguồn vốn tín dụng xanh và bảo hiểm nông nghiệp có định giá minh bạch.',
    ],
  },
  {
    id: 'kinhte-sg-05',
    publisher: 'Tạp chí Kinh Tế Sài Gòn',
    date: '08/02/2026',
    title: 'Ứng dụng Drone & AI: Bài toán tối ưu 38% chi phí vật tư cho thủ phủ sầu riêng',
    summary:
      'Phân tích hiệu quả tài chính của việc chuyển đổi từ phun đại trà sang lập trình bay phun định vị chính xác từng cụm tán nhiễm bệnh.',
    category: 'Phân tích tài chính',
    readTime: '4 phút',
    content: [
      'Theo khảo sát tại 42 hợp tác xã nông nghiệp ứng dụng hệ thống viễn thám VWING trong vụ mùa 2025-2026, chi phí vật tư nông nghiệp trung bình giảm từ 82 triệu đồng/ha/năm xuống còn 50.8 triệu đồng/ha/năm.',
      'Sự sụt giảm chi phí này chủ yếu nhờ hạn chế 70% các đợt phun phòng ngừa vô tội vạ và tập trung điều trị trúng đích.',
    ],
  },
];

export const activeMission: TelemetryMission = {
  id: 'mission-48',
  code: 'Đắk Lắk Mission #48',
  location: 'Vườn Sầu Riêng Krông Pắc, Đắk Lắk',
  crop: 'Sầu Riêng Monthong & Ri6 (120 ha)',
  canopyHealthPercent: 98.4,
  altitudeMeters: 18.5,
  speedMs: 8.2,
  windSpeedMs: 3.2,
  batteryPercent: 84,
  ndviAverage: 0.86,
  biomassPercent: 94.2,
  canopyAreaM2: 18.4,
  laserPulseFreq: '1.4M pts/s',
  rtkStatus: 'RTK GPS Lock (±0.8cm)',
  spectralBands: 5,
};
