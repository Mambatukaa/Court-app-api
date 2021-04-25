import faker from 'faker';

import { Users, Courts, Bookings, Schedules } from './models';

/*
 * Remove mongoose functionalities & convert to raw object
 */
const save = async object => {
  const savedObject = await object.save();

  const fixedObject = JSON.parse(JSON.stringify(savedObject));

  // eslint-disable-next-line no-underscore-dangle
  delete fixedObject.__v;

  return fixedObject;
};

export const userFactory = async (params = {}) => {
  const user = new Users({
    username: params.username,
    email: params.email,
    password: params.password,
    role: params.role,
  });

  return save(user);
};

export const courtFactory = async (params = {}) => {
  const court = new Courts({
    name: params.name,
    ownerId: params.ownerId || null,
    image: params.image || null,
    location: {
      lat: params.lat,
      lng: params.lng,
    },
    slotSize: params.slotSize,
    description: params.description,
    courtDetail: params.courtDetail,
    warning: params.warning,
    parking: params.parking,
  });

  return save(court);
};

export const bookingFactory = async (params = {}) => {
  const booking = new Bookings({
    courtId: params.courtId,
    userId: params.userId,
    data: params.date || null,
    status: null,
    scheduleId: params.scheduleId,
  });

  return save(booking);
};

export const scheduleFactory = async (params = {}) => {
  const booking = new Schedules({
    courtId: params.courtId,
    day: params.day,
    startTime: params.startTime,
    endTime: params.endTime,
    price: params.price,
  });

  return save(booking);
};

export const factoriesFactory = async () => {
  const user = await userFactory({
    username: 'mambatukaa',
    email: 'sbatuka9@gmail.com',
    password: 'Sankobe1',
    role: 'admin',
  });

  const court = await courtFactory({
    name: 'Монгол Улсын Их Сургууль',
    parking: 'Үнэгүй',
    warning: 'Заалны зориулалтын пүүз болон 2 өөр өнгийн подволктой ирэх',
    courtDetail: 'NBA стандарт шал',
    description: 'Олон улсын стандарт хангасан спорт заал',
    slotSize: 15,
    lat: 47.925790510677025,
    lng: 106.92164146576889,
    image:
      'https://www.nba.com/resources/static/team/v2/heat/custom-projects/2018-19_Uniforms/imgs/vice-nights-court-1.jpg',
  });

  const court1 = await courtFactory({
    name: 'Спортын төв ордон',
    parking: 'Үнэгүй',
    courtDetail: 'FIBA стандарт шал',
    warning: 'Заалны зориулалтын пүүз болон 2 өөр өнгийн подволктой ирэх',
    description: 'Олон улсын стандарт хангасан спорт заал',
    slotSize: 15,
    lat: 47.92097351752355,
    lng: 106.9242721814756,
    image:
      'https://i2.wp.com/homesoftherich.net/wp-content/uploads/2014/12/Screen-Shot-2014-12-15-at-2.32.06-AM.png',
  });

  await courtFactory({
    name: 'Наадам центр',
    parking: 'Үнэгүй',
    courtDetail: 'Олон улсын стандарт шал',
    warning: 'Заалны зориулалтын пүүз болон 2 өөр өнгийн подволктой ирэх',
    description: 'Олон улсын стандарт хангасан спорт заал',
    slotSize: 15,
    lat: 47.9027591743968,
    lng: 106.91191292901968,
    image:
      'http://content.page.mn/uploads/users/224/images/18951006_1054469008021390_5781497061314247735_n.jpg',
  });

  await courtFactory({
    name: 'Логарифм ЕБС',
    parking: 'Үнэгүй',
    courtDetail: 'Олон улсын стандарт шал',
    warning: 'Заалны зориулалтын пүүз болон 2 өөр өнгийн подволктой ирэх',
    description: 'Олон улсын стандарт хангасан спорт заал',
    slotSize: 15,
    lat: 47.92232523633226,
    lng: 106.92701225230482,
    image:
      'https://cdn.greensoft.mn/uploads/users/227/images/37849302_1681252238669257_1902992999747420160_n.jpg',
  });

  await courtFactory({
    name: 'Мон алтиус',
    parking: 'Үнэгүй',
    courtDetail: 'NBA стандарт шал',
    warning: 'Заалны зориулалтын пүүз болон 2 өөр өнгийн подволктой ирэх',
    description: 'Олон улсын стандарт хангасан спорт заал',
    slotSize: 15,
    lat: 47.91793734910583,
    lng: 106.88599709833399,
    image: 'https://cugoldeneagles.com/images/2019/7/11/CU_Facilities_Digital_11.jpg',
  });

  await courtFactory({
    name: 'Нэгдүгээр сургууль',
    parking: 'Байхгүй',
    courtDetail: 'NBA стандарт шал',
    warning: 'Заалны зориулалтын пүүз болон 2 өөр өнгийн подволктой ирэх',
    description: 'Олон улсын стандарт хангасан цэвэрхэн спорт заал',
    slotSize: 15,
    lat: 47.915560349494385,
    lng: 106.91191291367696,
    image: 'https://www.ryerson.ca/content/dam/recreation/Facilities/CCC_737wv2.jpg',
  });

  await courtFactory({
    name: '31-р сургууль',
    parking: 'Байхгүй',
    courtDetail: 'Энгийн мод',
    warning: 'Заалны зориулалтын пүүз болон 2 өөр өнгийн подволктой ирэх',
    description: 'Стандарт хангасан цэвэрхэн спорт заал',
    slotSize: 15,
    lat: 47.910019809404425,
    lng: 106.90846995415491,
    image: 'https://cugoldeneagles.com/images/2019/7/11/CU_Facilities_Digital_12.jpg',
  });

  await courtFactory({
    name: '5-р сургууль',
    parking: 'Байхгүй',
    courtDetail: 'Энгийн мод',
    warning: 'Заалны зориулалтын пүүз болон 2 өөр өнгийн подволктой ирэх',
    description: 'Стандарт хангасан цэвэрхэн спорт заал',
    slotSize: 15,
    lat: 47.925083778104145,
    lng: 106.91147866764796,
    image: 'https://news.nd.edu/assets/320255/1000x562/rolfs_athletic_hall_27_feature.jpg',
  });

  await courtFactory({
    name: '12-р сургууль',
    parking: 'Байхгүй',
    courtDetail: 'Стандарт резин шал',
    warning: 'Заалны зориулалтын пүүз болон 2 өөр өнгийн подволктой ирэх',
    description: 'Стандарт хангасан цэвэрхэн спорт заал',
    slotSize: 15,
    lat: 47.91298829761568,
    lng: 106.81768342813743,
    image:
      'https://athletics.rose-hulman.edu/images/2020/6/18/Hulbert_Arena.jpg?width=600&height=360&mode=crop',
  });

  await courtFactory({
    name: '84-р сургууль',
    parking: 'Байхгүй',
    courtDetail: 'Стандарт резин шал',
    warning: 'Заалны зориулалтын пүүз болон 2 өөр өнгийн подволктой ирэх',
    description: 'Олон улсын стандарт хангасан цэвэрхэн спорт заал',
    slotSize: 15,
    lat: 47.916176605941125,
    lng: 106.93943324495287,
    image: 'https://jbuathletics.com/images/2016/8/14//20140729_ms1_athletics_facilities_8743.jpg',
  });

  /*   const schedule = await scheduleFactory({
    courtId: court._id,
    day: '2021-04-23 05:18:00.623Z',
    startTime: 'Fri Apr 23 2021 10:00:00 GMT+0800 (Ulaanbaatar Standard Time)',
    endTime: 'Fri Apr 23 2021 11:00:00 GMT+0800 (Ulaanbaatar Standard Time)',
    price: 30000,
  });

  const schedule1 = await scheduleFactory({
    courtId: court._id,
    day: '2021-04-23 05:18:00.623Z',
    startTime: 'Fri Apr 23 2021 11:00:00 GMT+0800 (Ulaanbaatar Standard Time)',
    endTime: 'Fri Apr 23 2021 12:00:00 GMT+0800 (Ulaanbaatar Standard Time)',
    price: 60000,
  });

  await scheduleFactory({
    courtId: court1._id,
    day: '2021-04-23 05:18:00.623Z',
    startTime: 'Fri Apr 23 2021 12:00:00 GMT+0800 (Ulaanbaatar Standard Time)',
    endTime: 'Fri Apr 23 2021 13:00:00 GMT+0800 (Ulaanbaatar Standard Time)',
    price: 20000,
  });
  await scheduleFactory({
    courtId: court._id,
    day: '2021-04-23 05:18:00.623Z',
    startTime: 'Fri Apr 23 2021 13:00:00 GMT+0800 (Ulaanbaatar Standard Time)',
    endTime: 'Fri Apr 23 2021 14:00:00 GMT+0800 (Ulaanbaatar Standard Time)',
    price: 40000,
  });
  await scheduleFactory({
    courtId: court1._id,
    day: '2021-04-23 05:18:00.623Z',
    startTime: 'Fri Apr 23 2021 14:00:00 GMT+0800 (Ulaanbaatar Standard Time)',
    endTime: 'Fri Apr 23 2021 15:00:00 GMT+0800 (Ulaanbaatar Standard Time)',
    price: 30000,
  });
  await scheduleFactory({
    courtId: court1._id,
    day: '2021-04-23 05:18:00.623Z',
    startTime: 'Fri Apr 23 2021 16:00:00 GMT+0800 (Ulaanbaatar Standard Time)',
    endTime: 'Fri Apr 23 2021 17:00:00 GMT+0800 (Ulaanbaatar Standard Time)',
    price: 50000,
  });

  await bookingFactory({
    courtId: court._id,
    userId: user._id,
    scheduleId: schedule._id,
  });

  await bookingFactory({
    courtId: court._id,
    userId: user._id,
    scheduleId: schedule1._id,
  }); */
};
