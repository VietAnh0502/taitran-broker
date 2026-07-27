import logo from '../../img/htg-investment-logo-transparent.png'
import founderCutout from './optimized/founder-cutout.png'
import founderSuit from './optimized/founder-suit.jpg'
import founderWorking from './optimized/founder-working.jpg'
import researchLogo from './optimized/htg-research.jpg'
import communityLogo from './optimized/community-transparent.png'
import eventStage from './optimized/event-stage.jpg'
import eventGroup from './optimized/event-group.jpg'
import eventPeople from './optimized/event-people.jpg'
import founderAward from './optimized/founder-award.jpg'
import vpsAward from './optimized/vps-outstanding-employee-2024.jpg'
import vpsRecognition from './optimized/vps-recognition-plaque.jpg'
import ssiRecognition from './optimized/ssi-recognition.jpg'
import awardsCollection from './optimized/professional-awards-collection.jpg'
import partySpeaking from './optimized/gallery-party-speaking.jpg'
import partyVenue from './optimized/gallery-party-venue.jpg'
import partyNetworking from './optimized/gallery-party-networking.jpg'
import partyStage from './optimized/gallery-party-stage.jpg'
import partyBanquet from './optimized/gallery-party-banquet.jpg'
import partyGuest from './optimized/gallery-party-guest.jpg'
import partyCommunity from './optimized/gallery-party-community.jpg'
import relaxWorkingLaptop from './optimized/relax-working-laptop.jpg'
import relaxEventHall from './optimized/relax-event-hall.jpg'
import relaxKoiGarden from './optimized/relax-koi-garden.jpg'
import relaxResortGarden from './optimized/relax-resort-garden.jpg'
import relaxResortHallway from './optimized/relax-resort-hallway.jpg'
import relaxBeachLounge from './optimized/relax-beach-lounge.jpg'
import relaxPoolLounge from './optimized/relax-pool-lounge.jpg'
import relaxWhiteShirt from './optimized/relax-white-shirt.jpg'
import relaxCafeCandid from './optimized/relax-cafe-candid.jpg'

export const images = {
  logo: { src: logo, alt: 'Logo HTG Investment màu xanh lá' },
  logoSmall: { src: logo, alt: 'Logo HTG Investment' },
  founderCutout: { src: founderCutout, alt: 'Tài Trần làm việc bên máy tính và tài liệu phân tích' },
  founderSuit: { src: founderSuit, alt: 'Chân dung Tài Trần trong trang phục vest chuyên nghiệp' },
  founderWorking: { src: founderWorking, alt: 'Tài Trần đang làm việc tại bàn phân tích' },
  researchLogo: { src: researchLogo, alt: 'Nhận diện HTG Research – Trung tâm phân tích' },
  communityLogo: { src: communityLogo, alt: 'Logo trong suốt HTG Smart Investments Community' },
  eventStage: { src: eventStage, alt: 'Sân khấu hội tư vấn đầu tư với chủ đề Bản lĩnh, bứt phá, thành công' },
  eventGroup: { src: eventGroup, alt: 'Các khách mời chụp ảnh tại hội tư vấn đầu tư' },
  eventPeople: { src: eventPeople, alt: 'Tài Trần cùng các khách mời tại sự kiện cộng đồng đầu tư' },
  founderAward: { src: founderAward, alt: 'Nguyễn Đức Tài cầm kỷ niệm chương trong bộ ảnh nghề nghiệp' },
  vpsAward: { src: vpsAward, alt: 'Bằng khen Nhân viên xuất sắc 2024 mang tên Nguyễn Đức Tài' },
  vpsRecognition: { src: vpsRecognition, alt: 'Bảng vinh danh nghề nghiệp mang tên Nguyễn Đức Tài tại VPS' },
  ssiRecognition: { src: ssiRecognition, alt: 'Bảng vinh danh nghề nghiệp mang tên Nguyễn Đức Tài tại SSI' },
  awardsCollection: { src: awardsCollection, alt: 'Góc trưng bày sách chuyên môn, cúp và kỷ niệm chương nghề nghiệp của Nguyễn Đức Tài' },
} as const

export const galleries = {
  events: [
    { src: partySpeaking, alt: 'Nguyễn Đức Tài phát biểu tại sự kiện tư vấn đầu tư', caption: 'Chia sẻ tại sự kiện đầu tư', ratio: 2 / 3 },
    { src: partyVenue, alt: 'Toàn cảnh hội trường sự kiện đầu tư', caption: 'Không gian hội thảo nhà đầu tư', ratio: 2 / 3 },
    { src: partyNetworking, alt: 'Khách mời giao lưu trong tiệc sự kiện đầu tư', caption: 'Giao lưu cùng cộng đồng', ratio: 2 / 3 },
    { src: partyStage, alt: 'Nguyễn Đức Tài tại sân khấu sự kiện nhà đầu tư', caption: 'Dấu ấn tại sự kiện', ratio: 2 / 3 },
    { src: partyBanquet, alt: 'Bàn tiệc được chuẩn bị tại sự kiện cộng đồng đầu tư', caption: 'Không gian kết nối tại sự kiện', ratio: 2 / 3 },
    { src: partyGuest, alt: 'Nguyễn Đức Tài chụp ảnh cùng khách mời tại sự kiện', caption: 'Gặp gỡ khách mời', ratio: 3 / 2 },
    { src: partyCommunity, alt: 'Nguyễn Đức Tài giao lưu tại sự kiện cộng đồng nhà đầu tư', caption: 'Kết nối cộng đồng đầu tư', ratio: 2 / 3 },
  ],
  personal: [
    { src: relaxWorkingLaptop, alt: 'Nguyễn Đức Tài làm việc với laptop tại quán cà phê nhiều cây xanh', caption: 'Công việc không giới hạn không gian', ratio: 4 / 3 },
    { src: relaxEventHall, alt: 'Nguyễn Đức Tài trong trang phục trắng tại sảnh sự kiện', caption: 'Một dấu mốc trên hành trình trải nghiệm', ratio: 4 / 3 },
    { src: relaxKoiGarden, alt: 'Nguyễn Đức Tài thư giãn bên hồ cá koi trong khu vườn', caption: 'Khoảng lặng để tái tạo năng lượng', ratio: 4 / 3 },
    { src: relaxResortGarden, alt: 'Nguyễn Đức Tài tại khu vườn xanh của khu nghỉ dưỡng', caption: 'Gần hơn với thiên nhiên', ratio: 4 / 3 },
    { src: relaxResortHallway, alt: 'Nguyễn Đức Tài trong trang phục trắng tại hành lang khu nghỉ dưỡng', caption: 'Những ngày sống chậm hơn', ratio: 4 / 3 },
    { src: relaxBeachLounge, alt: 'Nguyễn Đức Tài đeo kính thư giãn trên ghế bên bãi biển', caption: 'Nạp lại năng lượng bên biển', ratio: 4 / 3 },
    { src: relaxPoolLounge, alt: 'Nguyễn Đức Tài thư giãn tại khu ghế nghỉ ngoài trời', caption: 'Một nhịp nghỉ giữa hành trình', ratio: 4 / 3 },
    { src: relaxWhiteShirt, alt: 'Chân dung đời thường Nguyễn Đức Tài trong trang phục áo trắng', caption: 'Khoảnh khắc giản dị ngoài công việc', ratio: 4 / 3 },
    { src: relaxCafeCandid, alt: 'Nguyễn Đức Tài trong khoảnh khắc đời thường tại nhà hàng khu nghỉ dưỡng', caption: 'Cân bằng để đi đường dài', ratio: 4 / 3 },
  ],
} as const
