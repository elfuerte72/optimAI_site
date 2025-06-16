'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Динамический импорт компонентов
const Navbar = dynamic(() => import('@shared/ui').then(mod => ({ default: mod.Navbar })), {
    ssr: false,
    loading: () => <div className="h-16 bg-black" />,
});

const ClientTermsPage: React.FC = () => {
    return (
        <div className="flex min-h-screen flex-col bg-black text-white">
            <Navbar />

            <main className="flex-grow">
                <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="prose prose-invert prose-lg max-w-none">
                        <h1 className="mb-8 text-4xl font-bold text-white">Условия использования</h1>

                        <div className="mb-8 rounded-lg border border-red-500/20 bg-red-500/10 p-4">
                            <p className="text-red-200">
                                <strong>Последнее обновление:</strong> 31 мая 2025 г.
                            </p>
                        </div>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-200">1. Общие положения</h2>

                            <p className="mb-4 text-gray-300">
                                Настоящие Условия использования (далее — «Условия») регулируют порядок использования сайта
                                <strong className="text-white"> optimaai.ru</strong> (далее — «Сайт»), принадлежащего OptimaAI (далее — «Компания», «мы»).
                            </p>

                            <p className="mb-4 text-gray-300">Условия разработаны в соответствии с требованиями:</p>
                            <ul className="mb-4 list-disc pl-6 text-gray-300">
                                <li>Гражданского кодекса Российской Федерации</li>
                                <li>Федерального закона от 27.07.2006 № 149-ФЗ «Об информации, информационных технологиях и о защите информации»</li>
                                <li>Федерального закона от 07.02.1992 № 2300-1 «О защите прав потребителей»</li>
                                <li>Федерального закона от 09.07.1993 № 5351-1 «Об авторском праве и смежных правах»</li>
                            </ul>

                            <div className="mb-6 rounded-lg border border-blue-500/20 bg-blue-500/10 p-4">
                                <p className="text-blue-200">
                                    <strong>Важно:</strong> Используя сайт, вы автоматически соглашаетесь с настоящими Условиями. Если вы не
                                    согласны с какими-либо положениями, прекратите использование сайта.
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-200">2. Термины и определения</h2>

                            <div className="space-y-4">
                                <div className="rounded-lg bg-gray-800 p-4">
                                    <p className="text-gray-300">
                                        <strong className="text-white">Сайт</strong> — интернет-ресурс optimaai.ru, включающий все его страницы, разделы и функциональные элементы.
                                    </p>
                                </div>

                                <div className="rounded-lg bg-gray-800 p-4">
                                    <p className="text-gray-300">
                                        <strong className="text-white">Пользователь</strong> — любое физическое или юридическое лицо, использующее сайт.
                                    </p>
                                </div>

                                <div className="rounded-lg bg-gray-800 p-4">
                                    <p className="text-gray-300">
                                        <strong className="text-white">Контент</strong> — вся информация, размещённая на сайте: тексты, изображения, видео, аудио, программный код, дизайн.
                                    </p>
                                </div>

                                <div className="rounded-lg bg-gray-800 p-4">
                                    <p className="text-gray-300">
                                        <strong className="text-white">Прайс-лист</strong> — документ с информацией о стоимости услуг компании, доступный для скачивания.
                                    </p>
                                </div>

                                <div className="rounded-lg bg-gray-800 p-4">
                                    <p className="text-gray-300">
                                        <strong className="text-white">Услуги</strong> — деятельность компании в области интеграции искусственного интеллекта, обучения и консультирования.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-200">3. Предмет и сфера применения</h2>

                            <p className="mb-4 text-gray-300">Сайт OptimaAI представляет собой информационный ресурс, который:</p>
                            <ul className="mb-6 list-disc pl-6 text-gray-300">
                                <li>Предоставляет информацию о компании и её деятельности</li>
                                <li>Описывает услуги в области искусственного интеллекта</li>
                                <li>Содержит новости и статьи по тематике ИИ</li>
                                <li>Предоставляет возможность скачивания прайс-листа</li>
                                <li>Обеспечивает связь с компанией через Telegram</li>
                            </ul>

                            <p className="mb-4 text-gray-300">Сайт НЕ предоставляет:</p>
                            <ul className="mb-6 list-disc pl-6 text-gray-300">
                                <li>Возможность регистрации или создания личного кабинета</li>
                                <li>Интерактивные сервисы с пользовательским контентом</li>
                                <li>Онлайн-платежи или электронную коммерцию</li>
                                <li>Персонализированные рекомендации</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-200">4. Права и обязанности пользователя</h2>

                            <h3 className="mb-3 text-xl font-medium text-gray-200">4.1. Пользователь имеет право:</h3>
                            <ul className="mb-6 list-disc pl-6 text-gray-300">
                                <li>Свободно просматривать информацию на сайте</li>
                                <li>Скачивать прайс-лист для ознакомления</li>
                                <li>Связываться с компанией через указанные контакты</li>
                                <li>Получать актуальную информацию об услугах</li>
                                <li>Прекратить использование сайта в любое время</li>
                            </ul>

                            <h3 className="mb-3 text-xl font-medium text-gray-200">4.2. Пользователь обязуется:</h3>
                            <ul className="mb-6 list-disc pl-6 text-gray-300">
                                <li>Использовать сайт исключительно в законных целях</li>
                                <li>Не нарушать авторские права на контент</li>
                                <li>Не предпринимать действий, нарушающих работу сайта</li>
                                <li>Не использовать автоматизированные средства для массового скачивания контента</li>
                                <li>Соблюдать настоящие Условия использования</li>
                            </ul>

                            <h3 className="mb-3 text-xl font-medium text-gray-200">4.3. Пользователю запрещается:</h3>
                            <ul className="mb-6 list-disc pl-6 text-gray-300">
                                <li>Копировать, воспроизводить или распространять контент сайта без разрешения</li>
                                <li>Использовать контент в коммерческих целях без согласования</li>
                                <li>Модифицировать или создавать производные работы на основе контента</li>
                                <li>Пытаться получить несанкционированный доступ к системам сайта</li>
                                <li>Распространять вредоносное программное обеспечение</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-200">5. Права и обязанности компании</h2>

                            <h3 className="mb-3 text-xl font-medium text-gray-200">5.1. Компания имеет право:</h3>
                            <ul className="mb-6 list-disc pl-6 text-gray-300">
                                <li>Изменять содержание сайта без предварительного уведомления</li>
                                <li>Временно приостанавливать работу сайта для технического обслуживания</li>
                                <li>Ограничивать доступ к сайту при нарушении Условий</li>
                                <li>Изменять настоящие Условия использования</li>
                                <li>Собирать анонимную статистику использования сайта</li>
                            </ul>

                            <h3 className="mb-3 text-xl font-medium text-gray-200">5.2. Компания обязуется:</h3>
                            <ul className="mb-6 list-disc pl-6 text-gray-300">
                                <li>Поддерживать работоспособность сайта</li>
                                <li>Обеспечивать безопасность пользовательских данных</li>
                                <li>Предоставлять актуальную информацию об услугах</li>
                                <li>Соблюдать требования российского законодательства</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-200">6. Интеллектуальная собственность</h2>

                            <p className="mb-4 text-gray-300">
                                Все материалы сайта (тексты, изображения, дизайн, программный код, логотипы) являются объектами авторского права
                                и принадлежат компании OptimaAI или используются на законных основаниях.
                            </p>

                            <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 p-4">
                                <p className="text-red-200">
                                    <strong>Защита авторских прав:</strong> Несанкционированное использование контента сайта может повлечь
                                    ответственность в соответствии со статьями 1250-1253 Гражданского кодекса РФ.
                                </p>
                            </div>

                            <h3 className="mb-3 text-xl font-medium text-gray-200">6.1. Разрешённое использование:</h3>
                            <ul className="mb-6 list-disc pl-6 text-gray-300">
                                <li>Просмотр контента для личного ознакомления</li>
                                <li>Цитирование с обязательным указанием источника</li>
                                <li>Скачивание прайс-листа для ознакомления с услугами</li>
                            </ul>

                            <h3 className="mb-3 text-xl font-medium text-gray-200">6.2. Запрещённое использование:</h3>
                            <ul className="mb-6 list-disc pl-6 text-gray-300">
                                <li>Полное или частичное копирование контента без разрешения</li>
                                <li>Использование в коммерческих целях</li>
                                <li>Размещение на других сайтах без согласования</li>
                                <li>Модификация или переработка материалов</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-200">7. Скачивание прайс-листа</h2>

                            <p className="mb-4 text-gray-300">Сайт предоставляет возможность бесплатного скачивания прайс-листа услуг компании.</p>

                            <h3 className="mb-3 text-xl font-medium text-gray-200">7.1. Условия скачивания:</h3>
                            <ul className="mb-6 list-disc pl-6 text-gray-300">
                                <li>Скачивание доступно без регистрации</li>
                                <li>Файл предназначен для ознакомления с услугами и ценами</li>
                                <li>Информация в прайс-листе может изменяться без предварительного уведомления</li>
                                <li>Прайс-лист не является публичной офертой</li>
                            </ul>

                            <h3 className="mb-3 text-xl font-medium text-gray-200">7.2. Использование прайс-листа:</h3>
                            <ul className="mb-6 list-disc pl-6 text-gray-300">
                                <li>Разрешается использование для ознакомления и планирования</li>
                                <li>Запрещается коммерческое распространение</li>
                                <li>Запрещается изменение содержания документа</li>
                                <li>При цитировании обязательно указание источника</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-200">8. Ограничение ответственности</h2>

                            <div className="mb-6 rounded-lg border border-blue-500/20 bg-blue-500/10 p-4">
                                <p className="text-blue-200">
                                    <strong>Важно:</strong> Вся информация на сайте предоставляется «как есть» без каких-либо гарантий полноты,
                                    точности или актуальности.
                                </p>
                            </div>

                            <h3 className="mb-3 text-xl font-medium text-gray-200">8.1. Компания не несёт ответственности за:</h3>
                            <ul className="mb-6 list-disc pl-6 text-gray-300">
                                <li>Временную недоступность сайта по техническим причинам</li>
                                <li>Возможные неточности в информации о услугах</li>
                                <li>Действия третьих лиц при использовании сайта</li>
                                <li>Ущерб от использования или невозможности использования сайта</li>
                                <li>Содержание внешних сайтов, на которые ведут ссылки</li>
                            </ul>

                            <h3 className="mb-3 text-xl font-medium text-gray-200">8.2. Ограничения:</h3>
                            <ul className="mb-6 list-disc pl-6 text-gray-300">
                                <li>Максимальная ответственность компании ограничена суммой 1000 рублей</li>
                                <li>Компания не возмещает косвенные убытки</li>
                                <li>Ответственность исключается в случае форс-мажорных обстоятельств</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-200">9. Ссылки на сторонние ресурсы</h2>

                            <p className="mb-4 text-gray-300">Сайт может содержать ссылки на внешние интернет-ресурсы, включая:</p>
                            <ul className="mb-6 list-disc pl-6 text-gray-300">
                                <li>Telegram-канал компании</li>
                                <li>Источники новостей об искусственном интеллекте</li>
                                <li>Партнёрские и информационные ресурсы</li>
                            </ul>

                            <p className="mb-4 text-gray-300">Компания не контролирует содержание внешних сайтов и не несёт ответственности за:</p>
                            <ul className="mb-6 list-disc pl-6 text-gray-300">
                                <li>Информацию, размещённую на внешних ресурсах</li>
                                <li>Политику конфиденциальности внешних сайтов</li>
                                <li>Безопасность внешних ресурсов</li>
                                <li>Ущерб от использования внешних сайтов</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-200">10. Изменения Условий использования</h2>

                            <p className="mb-4 text-gray-300">Компания оставляет за собой право изменять настоящие Условия в одностороннем порядке.</p>

                            <h3 className="mb-3 text-xl font-medium text-gray-200">10.1. Порядок внесения изменений:</h3>
                            <ul className="mb-6 list-disc pl-6 text-gray-300">
                                <li>Новая версия Условий публикуется на сайте</li>
                                <li>Дата последнего обновления указывается в документе</li>
                                <li>Изменения вступают в силу с момента публикации</li>
                                <li>Продолжение использования сайта означает согласие с новыми Условиями</li>
                            </ul>

                            <h3 className="mb-3 text-xl font-medium text-gray-200">10.2. Уведомление об изменениях:</h3>
                            <ul className="mb-6 list-disc pl-6 text-gray-300">
                                <li>Существенные изменения анонсируются на главной странице</li>
                                <li>Пользователи могут отслеживать изменения по дате обновления</li>
                                <li>При несогласии с изменениями пользователь должен прекратить использование сайта</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-200">11. Применимое право и разрешение споров</h2>

                            <p className="mb-4 text-gray-300">Настоящие Условия и все связанные с ними отношения регулируются законодательством Российской Федерации.</p>

                            <h3 className="mb-3 text-xl font-medium text-gray-200">11.1. Разрешение споров:</h3>
                            <ul className="mb-6 list-disc pl-6 text-gray-300">
                                <li>Споры разрешаются путём переговоров</li>
                                <li>При невозможности достижения соглашения — в судебном порядке</li>
                                <li>Подсудность определяется по месту нахождения компании</li>
                                <li>Применяется российское материальное и процессуальное право</li>
                            </ul>

                            <h3 className="mb-3 text-xl font-medium text-gray-200">11.2. Претензионный порядок:</h3>
                            <ul className="mb-6 list-disc pl-6 text-gray-300">
                                <li>Обязательное досудебное урегулирование споров</li>
                                <li>Срок рассмотрения претензий: 30 дней</li>
                                <li>Претензии направляются через Telegram: @AcademyOptima</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-200">12. Заключительные положения</h2>

                            <p className="mb-4 text-gray-300">
                                Если какое-либо положение настоящих Условий будет признано недействительным, остальные положения сохраняют свою силу.
                            </p>

                            <p className="mb-6 text-gray-300">
                                Настоящие Условия составляют полное соглашение между пользователем и компанией относительно использования сайта.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-200">13. Контактная информация</h2>

                            <div className="rounded-lg border border-gray-600 bg-gray-800 p-4">
                                <p className="mb-4 text-gray-300">
                                    По всем вопросам, связанным с использованием сайта и настоящими Условиями, обращайтесь:
                                </p>
                                <p className="mb-2 text-gray-300">
                                    <strong>Telegram:</strong>{' '}
                                    <a href="https://t.me/academyOptima" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                                        @AcademyOptima
                                    </a>
                                </p>
                                <p className="mb-2 text-gray-300">
                                    <strong>Сайт:</strong>{' '}
                                    <a href="https://optimaai.ru" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                                        optimaai.ru
                                    </a>
                                </p>
                                <p className="text-gray-300">
                                    <strong>Время рассмотрения обращений:</strong> до 3 рабочих дней
                                </p>
                            </div>
                        </section>

                        <div className="mt-12 text-right text-sm text-gray-400">
                            <p>Условия вступают в силу с момента размещения на сайте.</p>
                            <p>Последнее обновление: 31 мая 2025 г.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ClientTermsPage; 