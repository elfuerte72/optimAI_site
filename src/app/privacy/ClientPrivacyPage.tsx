'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Динамический импорт компонентов
const Navbar = dynamic(() => import('@shared/ui').then(mod => ({ default: mod.Navbar })), {
    ssr: false,
    loading: () => <div className="h-16 bg-black" />,
});

const ClientPrivacyPage: React.FC = () => {
    return (
        <div className="flex min-h-screen flex-col bg-black text-white">
            <Navbar />

            <main className="flex-grow">
                <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="prose prose-invert prose-lg max-w-none">
                        <h1 className="mb-8 text-4xl font-bold text-white">Политика конфиденциальности</h1>

                        <div className="mb-8 rounded-lg border border-blue-500/20 bg-blue-500/10 p-4">
                            <p className="text-blue-200">
                                <strong>Последнее обновление:</strong> 31 мая 2025 г.
                            </p>
                        </div>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-200">1. Общие положения</h2>

                            <p className="mb-4 text-gray-300">
                                Настоящая Политика конфиденциальности (далее — «Политика») определяет порядок обработки персональных данных
                                пользователей сайта <strong className="text-white">optimaai.ru</strong> (далее — «Сайт»), принадлежащего OptimaAI (далее — «Компания», «мы»).
                            </p>

                            <p className="mb-4 text-gray-300">Политика разработана в соответствии с требованиями:</p>
                            <ul className="mb-4 list-disc pl-6 text-gray-300">
                                <li>Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных»</li>
                                <li>Федерального закона от 13.03.2006 № 38-ФЗ «О рекламе»</li>
                                <li>Федерального закона от 27.07.2006 № 149-ФЗ «Об информации, информационных технологиях и о защите информации»</li>
                            </ul>

                            <h3 className="mb-3 text-xl font-medium text-gray-200">1.1. Цели обработки данных</h3>
                            <p className="mb-4 text-gray-300">
                                Сайт OptimaAI является информационным ресурсом, предоставляющим сведения о компании и её услугах в области
                                интеграции искусственного интеллекта. Основные цели:
                            </p>
                            <ul className="mb-6 list-disc pl-6 text-gray-300">
                                <li>Предоставление информации о компании и услугах</li>
                                <li>Обеспечение функционирования сайта</li>
                                <li>Анализ посещаемости и улучшение пользовательского опыта</li>
                                <li>Предоставление возможности скачивания прайс-листа</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-200">2. Сбор и обработка данных</h2>

                            <div className="mb-6 rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-4">
                                <p className="text-yellow-200">
                                    <strong>Важно:</strong> Сайт OptimaAI НЕ собирает персональные данные пользователей (ФИО, номера телефонов,
                                    адреса электронной почты) и не требует регистрации или авторизации.
                                </p>
                            </div>

                            <h3 className="mb-3 text-xl font-medium text-gray-200">2.1. Автоматически собираемые данные</h3>
                            <p className="mb-4 text-gray-300">При посещении сайта автоматически собираются следующие технические данные:</p>
                            <ul className="mb-6 list-disc pl-6 text-gray-300">
                                <li>IP-адрес пользователя</li>
                                <li>Информация о браузере (User-Agent)</li>
                                <li>Операционная система</li>
                                <li>Разрешение экрана</li>
                                <li>Время посещения страниц</li>
                                <li>Страницы, которые посетил пользователь</li>
                                <li>Реферер (сайт, с которого пользователь перешёл)</li>
                            </ul>

                            <h3 className="mb-3 text-xl font-medium text-gray-200">2.2. Файлы cookie</h3>
                            <p className="mb-4 text-gray-300">Сайт использует минимальное количество технических cookie-файлов для:</p>
                            <ul className="mb-4 list-disc pl-6 text-gray-300">
                                <li>Обеспечения корректной работы сайта</li>
                                <li>Запоминания пользовательских предпочтений</li>
                                <li>Анализа статистики посещений</li>
                            </ul>
                            <p className="mb-6 text-gray-300">
                                Пользователь может отключить cookie в настройках браузера, однако это может повлиять на функциональность сайта.
                            </p>

                            <h3 className="mb-3 text-xl font-medium text-gray-200">2.3. Шрифты Google Fonts</h3>
                            <p className="mb-6 text-gray-300">
                                Сайт использует шрифты Google Fonts, загружаемые с серверов Google. При загрузке шрифтов Google может получать
                                техническую информацию о вашем браузере и IP-адресе в соответствии с{' '}
                                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                                    Политикой конфиденциальности Google
                                </a>.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-200">3. Права субъектов персональных данных</h2>

                            <p className="mb-4 text-gray-300">Поскольку сайт не собирает персональные данные, пользователи имеют право:</p>
                            <ul className="mb-6 list-disc pl-6 text-gray-300">
                                <li>Получить подтверждение факта обработки персональных данных (в данном случае — их отсутствия)</li>
                                <li>Получить информацию о целях обработки данных</li>
                                <li>Обратиться с запросом о прекращении обработки данных</li>
                                <li>Обжаловать действия или бездействие в Роскомнадзоре</li>
                            </ul>

                            <div className="mb-6 rounded-lg border border-gray-600 bg-gray-800 p-4">
                                <h3 className="mb-3 text-lg font-medium text-gray-200">Контактная информация для обращений:</h3>
                                <p className="mb-2 text-gray-300">
                                    <strong>Telegram:</strong>{' '}
                                    <a href="https://t.me/optimaai_tg" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                                        @optimaai_tg
                                    </a>
                                </p>
                                <p className="text-gray-300">Срок рассмотрения обращений: до 30 дней с момента получения запроса.</p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-200">4. Передача данных третьим лицам</h2>

                            <p className="mb-4 text-gray-300">Компания НЕ передаёт персональные данные третьим лицам, поскольку не собирает их.</p>

                            <p className="mb-4 text-gray-300">Исключения составляют:</p>
                            <ul className="mb-6 list-disc pl-6 text-gray-300">
                                <li>Агрегированные анонимные данные статистики, которые не позволяют идентифицировать конкретного пользователя</li>
                                <li>Техническая информация, передаваемая Google при использовании Google Fonts</li>
                                <li>Данные, передаваемые в рамках исполнения требований законодательства РФ</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-200">5. Безопасность данных</h2>

                            <p className="mb-4 text-gray-300">Для защиты информации применяются следующие меры:</p>
                            <ul className="mb-6 list-disc pl-6 text-gray-300">
                                <li>Использование защищённого соединения HTTPS</li>
                                <li>Регулярное обновление программного обеспечения сервера</li>
                                <li>Ограничение доступа к серверным логам</li>
                                <li>Мониторинг безопасности</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-200">6. Сроки хранения данных</h2>

                            <p className="mb-4 text-gray-300">Технические данные (логи сервера) хранятся в течение:</p>
                            <ul className="mb-6 list-disc pl-6 text-gray-300">
                                <li>Логи веб-сервера: 6 месяцев</li>
                                <li>Статистические данные: 12 месяцев в агрегированном виде</li>
                                <li>Cookie-файлы: согласно настройкам браузера пользователя</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-200">7. Скачивание прайс-листа</h2>

                            <p className="mb-4 text-gray-300">Сайт предоставляет возможность скачивания прайс-листа услуг без регистрации. При скачивании файла:</p>
                            <ul className="mb-6 list-disc pl-6 text-gray-300">
                                <li>Не требуется предоставление персональных данных</li>
                                <li>В логах сервера фиксируется факт скачивания (IP-адрес, время, файл)</li>
                                <li>Данная информация используется исключительно для технической статистики</li>
                                <li>Персональная идентификация пользователя не производится</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-200">8. Ссылки на внешние ресурсы</h2>

                            <p className="mb-6 text-gray-300">
                                Сайт может содержать ссылки на внешние ресурсы (включая Telegram). Компания не несёт ответственности за политику
                                конфиденциальности и обработку данных на внешних сайтах.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-200">9. Изменения в Политике конфиденциальности</h2>

                            <p className="mb-4 text-gray-300">Компания оставляет за собой право вносить изменения в настоящую Политику. При внесении существенных изменений:</p>
                            <ul className="mb-6 list-disc pl-6 text-gray-300">
                                <li>Новая версия публикуется на сайте</li>
                                <li>Дата последнего обновления указывается в начале документа</li>
                                <li>Пользователи уведомляются об изменениях через размещение информации на главной странице сайта</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-200">10. Применимое право</h2>

                            <p className="mb-6 text-gray-300">
                                Настоящая Политика и все связанные с ней отношения регулируются законодательством Российской Федерации. Все споры
                                разрешаются в соответствии с действующим законодательством РФ.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-200">11. Контактная информация</h2>

                            <div className="rounded-lg border border-gray-600 bg-gray-800 p-4">
                                <p className="mb-4 text-gray-300">
                                    По всем вопросам, связанным с обработкой персональных данных и настоящей Политикой конфиденциальности, вы
                                    можете обратиться:
                                </p>
                                <p className="mb-2 text-gray-300">
                                    <strong>Telegram:</strong>{' '}
                                    <a href="https://t.me/optimaai_tg" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                                        @optimaai_tg
                                    </a>
                                </p>
                                <p className="text-gray-300">
                                    <strong>Сайт:</strong>{' '}
                                    <a href="https://optimaai.ru" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                                        optimaai.ru
                                    </a>
                                </p>
                            </div>
                        </section>

                        <div className="mt-12 text-right text-sm text-gray-400">
                            <p>Документ вступает в силу с момента размещения на сайте.</p>
                            <p>Последнее обновление: 31 мая 2025 г.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ClientPrivacyPage; 