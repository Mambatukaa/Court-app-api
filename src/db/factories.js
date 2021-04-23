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

  await courtFactory({
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

  const schedule = await scheduleFactory({
    courtId: court._id,
    day: '2021-04-23 05:18:00.623Z',
    startTime: 'Fri Apr 23 2021 14:00:00 GMT+0800 (Ulaanbaatar Standard Time)',
    endTime: 'Fri Apr 23 2021 15:00:00 GMT+0800 (Ulaanbaatar Standard Time)',
    price: 30000,
  });

  await bookingFactory({
    courtId: court._id,
    userId: user._id,
    scheduleId: schedule._id,
  });
};
