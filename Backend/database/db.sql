DROP DATABASE IF EXISTS healthcare;
CREATE DATABASE healthcare;

INSERT INTO `product` (
    `id`, 
    `summary`,
    `price`,
    `description`,
    `type`,
    `id_iva`,
    `id_supplied`
) VALUES (
    NULL,
    'Ibuprofeno + Metocarbamol 200/500 mg Caja Con 30 Tabletas Recubiertas',
    '30400',
    NULL,
    NULL,
    NULL,
    NULL
);
INSERT INTO `product` (
    `id`, 
    `summary`,
    `price`,
    `description`,
    `type`,
    `id_iva`,
    `id_supplied`
) VALUES (
    NULL,
    'Noxpirin Plus Caja Con 12 Cápsulas COL.',
    '12475',
    NULL,
    NULL,
    NULL,
    NULL
);