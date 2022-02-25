import { Types } from "mongoose";

export interface Advt {
  id: Types.ObjectId;
  advt_id: number; // ID на сайте
  title: string; // Заголовок
  brand: string; // Марка
  model: string; // Модель
  generation: string; // Поколение
  description: string; // Описание
  date_create: number; // Таймштамп даты создания объявления
  date_modify: number; // Таймштамп даты изменения объявления
  state: string; // Состояние (новое, бу...)
  status: string; // Статус (удален...)
  status_parse: string; // Статус парсера (ожидание, обновление...)
  price_byn: number; // Цена в рублях
  price_usd: number; // Цена в долларах
  city: string; // Город
  year: number; // Год производства
  gearbox: string; // Тип коробки передач
  volume: number; // Объем двигателя
  fuel: string; // Тип топлива
  kilometers: number; // Пробег
  carcase: string; // Кузов
  drive: string; // Привод
  color: string; // Цвет
  phones: string[]; // Номера телефон
  owner: string; // Имя владельца
  vin_status: boolean; // Вин проверян
  exchange: boolean; // Обмен возможен
  images: string[]; // Изображения
  is_private: boolean; // Частное или компание
  alloy_wheels: boolean; // Легкосплавные диски
  roof_rails: boolean; // Рейлинги на крыше
  tow_bar: boolean; // Фаркоп
  abs: boolean; // ABS
  esp: boolean; // ESP
  anti_slip: boolean; // Антипробуксовочная
  immobilizer: boolean; // Иммобилайзер
  signaling: boolean; // Сигнализация
  rain_sensor: boolean; // Датчик дождя
  behind_camera: boolean; // Камера заднего вида
  parking_sensors: boolean; // Парктроники
  control_dead_zones: boolean; // Контроль мертвых зон на зеркалах
  front_airbags: boolean; // Передние подушки
  side_airbags: boolean; // Боковые подушки
  behind_airbags: boolean; // Задние подушки
  interior_color: string; // Цвет салона
  interior_material: string; // Материал салона
  panoramic_view: boolean; // Панорамная крыша
  luke: boolean; // Люк
  version_7: boolean; // 7 местная версия
  auto_start: boolean; // Автозапуск двигателя
  cruise_control: boolean; // Круиз-контроль
  wheel_multimedia: boolean; // Управление мультимедиа с руля
  power_seats: boolean; // Электрорегулировка сидений
  front_power_windows: boolean; // Передние электро-стеклоподъёмники
  behind_power_windows: boolean; // Задние электро-стеклоподъёмники
  seat_heating: boolean; // Обогрев Сидений
  heated_windshield: boolean; // Обогрев Лобового стекла
  heated_mirrors: boolean; // Обогрев Зеркал
  wheel_heating: boolean; // Обогрев Руля
  heater: boolean; // Автономный отопитель
  climate_control: boolean; // Климат-контроль
  air_conditioner: boolean; // Кондиционер
  aux: boolean; // AUX или iPod
  bluetooth: boolean; // Bluetooth
  cd_mp3: boolean; // CD или MP3
  usb: boolean; // USB
  multimedia_screen: boolean; // Мультимедийный экран
  regular_navigation: boolean; // Штатная навигация
  xenon_headlights: boolean; // Ксеноновые фары
  fog_lights: boolean; // Противотуманные фары
  led_headlights: boolean; // Светодиодные фары
  site: string; // Сайт
  url: string; // Остальная часть ссылки
}
