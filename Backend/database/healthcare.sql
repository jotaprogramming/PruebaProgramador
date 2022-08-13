-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-08-2022 a las 01:15:39
-- Versión del servidor: 10.4.20-MariaDB
-- Versión de PHP: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `healthcare`
--
CREATE DATABASE IF NOT EXISTS `healthcare` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `healthcare`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `iva`
--

CREATE TABLE `iva` (
  `id` int(11) NOT NULL,
  `percentage` float NOT NULL COMMENT 'Percentage of IVA'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `iva`
--

INSERT INTO `iva` (`id`, `percentage`) VALUES
(1, 0.19);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `summary` varchar(255) NOT NULL,
  `image_path` text DEFAULT NULL,
  `price` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `id_iva` int(11) DEFAULT NULL,
  `id_supplied` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `product`
--

INSERT INTO `product` (`id`, `summary`, `image_path`, `price`, `description`, `type`, `id_iva`, `id_supplied`) VALUES
(1, 'Sal De Frutas Lua Plus Polvo Citrus Caja Con 6 Sobres', 'https://www.farmalisto.com.co/146125-large_default/comprar-sal-de-frutas-lua-plus-polvo-citrus-caja-con-6-sobres-precio.jpg', 16150, 'ES UN MEDICAMENTO. NO EXCEDER SU CONSUMO. LEER INDICACIONES Y CONTRAINDICACIONES. SI LOS SÍNTOMAS PERSISTEN, CONSULTAR AL MÉDICO.', 'Caja Con 6 Sobres', NULL, 1),
(2, 'Vitamina C Caja Con 10 Tiras De Tabletas Masticables C/U - Sabor Mandarina', 'https://colsubsidio.vteximg.com.br/arquivos/ids/160940-800-800/7703763750184.jpg?v=637111981051900000', 49400, NULL, NULL, NULL, NULL),
(3, 'Ibuprofeno + Metocarbamol 200/500 mg Caja Con 30 Tabletas Recubiertas', 'https://www.drogueriascafam.com.co/36992/comprar-en-cafam-ibuprofeno-800-mg-caja-con-50-tabletas-recubiertas-precio.jpg', 30400, NULL, NULL, NULL, NULL),
(4, 'Noxpirin Plus Caja Con 12 Cápsulas COL.', 'https://www.farmalisto.com.co/147873-large_default/noxpirin-plus-caja-con-12-capsulas.jpg', 12475, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `supplied`
--

CREATE TABLE `supplied` (
  `id` int(11) NOT NULL,
  `description` varchar(50) NOT NULL COMMENT 'route of administration'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `supplied`
--

INSERT INTO `supplied` (`id`, `description`) VALUES
(1, 'Oral');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `iva`
--
ALTER TABLE `iva`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_iva` (`id_iva`),
  ADD KEY `id_supplied` (`id_supplied`);

--
-- Indices de la tabla `supplied`
--
ALTER TABLE `supplied`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `iva`
--
ALTER TABLE `iva`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `supplied`
--
ALTER TABLE `supplied`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`id_iva`) REFERENCES `iva` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`id_supplied`) REFERENCES `supplied` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
