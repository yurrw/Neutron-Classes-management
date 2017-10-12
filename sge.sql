-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 12, 2017 at 06:08 AM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 7.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sge`
--

-- --------------------------------------------------------

--
-- Table structure for table `aluno`
--

CREATE TABLE `aluno` (
  `matricula` varchar(5) NOT NULL,
  `nome` varchar(60) NOT NULL,
  `data_nasc` date NOT NULL,
  `email` varchar(30) NOT NULL,
  `data_mod` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `aluno`
--

INSERT INTO `aluno` (`matricula`, `nome`, `data_nasc`, `email`, `data_mod`) VALUES
('12345', 'Seiya', '1973-12-01', 'seiya_pegasus@cdzmail.com', '0000-00-00 00:00:00'),
('12346', 'Shiryu', '1970-10-04', 'shiryu_dragao@cdzmail.com', '2016-10-06 22:21:35'),
('12347', 'Shun', '1973-02-23', 'shun_andromeda@cdzmail.com', '2016-10-06 22:21:20'),
('12348', 'Hyoga', '1971-11-12', 'hyoga_cisne@cdzmail.com', '2016-10-06 22:23:07'),
('12349', 'Ikki', '1970-07-06', 'ikki_fenix@cdzmail.com', '2016-10-06 22:24:05'),
('98712', 'Renan', '1657-03-12', 'fatlani@gmail.com', '2016-10-06 21:44:31');

-- --------------------------------------------------------

--
-- Table structure for table `aluno_nota`
--

CREATE TABLE `aluno_nota` (
  `matricula` varchar(5) NOT NULL,
  `disciplina_id` int(5) NOT NULL,
  `nota` int(11) NOT NULL,
  `ano_letivo` date NOT NULL,
  `data_mod` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='INCOMPLETO';

--
-- Dumping data for table `aluno_nota`
--

INSERT INTO `aluno_nota` (`matricula`, `disciplina_id`, `nota`, `ano_letivo`, `data_mod`) VALUES
('01671', 4, 6, '2016-12-18', '2016-12-22 00:16:42'),
('11223', 3, 8, '2016-12-18', '2016-12-22 00:16:47'),
('12345', 1, 8, '2016-12-18', '2016-12-19 01:23:57'),
('12346', 1, 10, '2016-12-19', '2016-12-19 02:46:07'),
('98712', 1, 3, '2016-12-18', '2016-12-19 01:25:52');

-- --------------------------------------------------------

--
-- Table structure for table `aluno_nota_tri`
--

CREATE TABLE `aluno_nota_tri` (
  `matricula` varchar(15) NOT NULL,
  `disciplina_id` varchar(2) NOT NULL,
  `ttri1` float DEFAULT NULL,
  `ptri1` float DEFAULT NULL,
  `ttri2` float DEFAULT NULL,
  `ptri2` float DEFAULT NULL,
  `ttri3` float DEFAULT NULL,
  `ptri3` float DEFAULT NULL,
  `tri4` float DEFAULT NULL,
  `ano` char(5) NOT NULL,
  `data_mod` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `aluno_nota_tri`
--

INSERT INTO `aluno_nota_tri` (`matricula`, `disciplina_id`, `ttri1`, `ptri1`, `ttri2`, `ptri2`, `ttri3`, `ptri3`, `tri4`, `ano`, `data_mod`) VALUES
('11223', '1', 2, 3, 3, 4, 3, 7, 1, '2017', '2017-02-02 15:15:12'),
('11223', '2', 1, 1, 2, 2, 3, 7, 0, '2017', '2017-02-02 16:45:29'),
('12345', '1', 2, 3, 3, 4, 0, 4, 1, '2017', '2017-02-02 15:15:12'),
('12345', '2', 3, 1, 2, 2, 3, 3, 0, '2017', '2017-02-02 16:45:29'),
('12346', '1', 2, 3, 3, 4, 1, 5, 1, '2017', '2017-02-02 15:15:12'),
('12346', '2', 1, 1, 2, 2, 3, 3, 0, '2017', '2017-02-02 16:45:29'),
('12347', '1', 2, 3, 3, 4, 2, 6, 1, '2017', '2017-02-02 15:15:12'),
('12347', '2', 3, 1, 2, 2, 3, 3, 0, '2017', '2017-02-02 16:45:29'),
('12348', '1', 2, 3, 3, 4, 0, 0, 1, '2017', '2017-02-02 15:15:11'),
('12348', '2', 1, 1, 2, 2, 3, 3, 0, '2017', '2017-02-02 16:45:29'),
('12349', '1', 2, 3, 3, 4, 1, 1, 1, '2017', '2017-02-02 15:15:11'),
('12349', '2', 1, 7, 2, 2, 3, 3, 0, '2017', '2017-02-02 16:45:29'),
('24043', '1', 2, 3, 3, 4, 2, 2, 1, '2017', '2017-02-02 15:15:12'),
('24043', '2', 1, 7, 2, 2, 3, 3, 0, '2017', '2017-02-02 16:45:29'),
('98712', '1', 2, 3, 3, 4, 3, 3, 1, '2017', '2017-02-02 15:15:12'),
('98712', '2', 1, 1, 2, 2, 3, 3, 0, '2017', '2017-02-02 16:45:29');

-- --------------------------------------------------------

--
-- Table structure for table `calendario`
--

CREATE TABLE `calendario` (
  `cod_evento` int(11) NOT NULL,
  `matricula` int(10) NOT NULL,
  `evento` tinytext NOT NULL,
  `descricao` tinytext NOT NULL,
  `datahora` datetime NOT NULL,
  `datafim` datetime NOT NULL,
  `allday` varchar(6) NOT NULL,
  `cor` varchar(10) NOT NULL,
  `cor2` varchar(10) NOT NULL,
  `turma` varchar(6) NOT NULL,
  `data_mod` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `disciplinas`
--

CREATE TABLE `disciplinas` (
  `disciplina_id` int(5) NOT NULL,
  `disciplina_nome` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `disciplinas`
--

INSERT INTO `disciplinas` (`disciplina_id`, `disciplina_nome`) VALUES
(1, 'Português'),
(2, 'Literatura'),
(7, 'Matemática I'),
(10, 'Matemática II'),
(13, 'Quí­mica I'),
(16, 'Quí­mica II'),
(19, 'Sociologia'),
(22, 'Geografia'),
(25, 'Biologia'),
(28, 'Físi­ca'),
(31, 'História'),
(34, 'Filosofia'),
(37, 'Inglês'),
(40, 'Espanhol'),
(43, 'Francês'),
(46, 'Ed. Física'),
(49, 'Artes'),
(50, 'Música'),
(51, 'Desenho Avançado'),
(53, 'ICC'),
(54, 'LPI'),
(55, 'LPII'),
(56, 'LPIII'),
(57, 'LPIV'),
(58, 'Eng. Software');

-- --------------------------------------------------------

--
-- Table structure for table `lembretes`
--

CREATE TABLE `lembretes` (
  `ID` int(11) NOT NULL,
  `user` varchar(15) NOT NULL,
  `content` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `lembretes`
--

INSERT INTO `lembretes` (`ID`, `user`, `content`) VALUES
(0, '10', '');

-- --------------------------------------------------------

--
-- Table structure for table `materia`
--

CREATE TABLE `materia` (
  `materia_id` int(5) NOT NULL,
  `nome` text NOT NULL,
  `descricao` text NOT NULL,
  `disciplina_id` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `materia`
--

INSERT INTO `materia` (`materia_id`, `nome`, `descricao`, `disciplina_id`) VALUES
(1, 'Modernismo', 'Movimento Literário no Brasil', '2'),
(2, 'Matrizes', 'Cálculos em um conjunto retangular de números, símbolos ou expressões, organizados em linhas e colunas', '3'),
(3, 'Eletromagnetismo', 'Conjunto de fenômenos que dizem respeito à interação entre campos elétricos e magnéticos e sua inter-relação', '12'),
(4, 'Relevo', 'Estudo das diferentes formas que moldam a superfície terrestre', '8'),
(5, 'Relevo', 'Estudo das diferentes formas que moldam a superfície terrestre', '8');

-- --------------------------------------------------------

--
-- Table structure for table `professor_disciplinas`
--

CREATE TABLE `professor_disciplinas` (
  `matricula` varchar(10) NOT NULL,
  `disciplina_id` varchar(5) NOT NULL,
  `ano_letivo` year(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `professor_disciplinas`
--

INSERT INTO `professor_disciplinas` (`matricula`, `disciplina_id`, `ano_letivo`) VALUES
('10', '1', 2016),
('10', '2', 2016);

-- --------------------------------------------------------

--
-- Table structure for table `profs`
--

CREATE TABLE `profs` (
  `matricula` varchar(10) NOT NULL,
  `nome` char(100) NOT NULL,
  `data_nasc` date NOT NULL,
  `cpf` char(15) NOT NULL,
  `tel_cel` varchar(15) NOT NULL,
  `email` varchar(50) NOT NULL,
  `data_mod` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `profs`
--

INSERT INTO `profs` (`matricula`, `nome`, `data_nasc`, `cpf`, `tel_cel`, `email`, `data_mod`) VALUES
('1', 'Jacinto', '1946-09-06', '1', '1', 'jacintao@gmail.com', '2016-09-22 04:31:13'),
('10', 'Jesus', '1010-10-10', '101.010.101-01', '(10)10101-0101', 'jc10@hot10mail.com', '2017-01-02 21:43:08'),
('123123', 'JoseTeste', '2312-12-31', '123.412.341-23', '(12)33123-1231', '1231@gmail.com', '2017-02-03 05:55:21'),
('2', 'Nunes', '0000-00-00', '2', '(22)22222-2222', '2@gmail.com', '2016-11-27 04:25:44'),
('25', 'Kithdris', '0000-00-00', '127', '(12)34567-8900', 'u7@tera.com', '2016-12-13 23:56:05'),
('3', 'Junes', '0000-00-00', '127', '(22)22222-2222', '3@3.com.br', '2016-12-13 23:05:58');

-- --------------------------------------------------------

--
-- Table structure for table `prof_diario`
--

CREATE TABLE `prof_diario` (
  `cod_aula` int(12) NOT NULL COMMENT 'codigo associado a questao ( cahave primaria)',
  `matricula` varchar(10) NOT NULL,
  `turma` varchar(7) NOT NULL,
  `data` date NOT NULL,
  `horaStart` char(5) NOT NULL,
  `disciplina_id` varchar(10) NOT NULL,
  `comentario` text NOT NULL,
  `data_mod` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `prof_diario`
--

INSERT INTO `prof_diario` (`cod_aula`, `matricula`, `turma`, `data`, `horaStart`, `disciplina_id`, `comentario`, `data_mod`) VALUES
(34, '10', 'IN313', '2017-01-28', '07:15', '2', '  teste26', '2017-01-28 23:42:55');

-- --------------------------------------------------------

--
-- Table structure for table `prof_diario_aluno`
--

CREATE TABLE `prof_diario_aluno` (
  `cod_aula` varchar(10) NOT NULL,
  `matricula` varchar(5) NOT NULL,
  `presente` varchar(5) NOT NULL,
  `data_mod` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `prof_diario_aluno`
--

INSERT INTO `prof_diario_aluno` (`cod_aula`, `matricula`, `presente`, `data_mod`) VALUES
('31', '12348', 'true', '2017-01-28 18:11:22'),
('31', '12349', 'false', '2017-01-28 18:11:22'),
('31', '24043', 'false', '2017-01-28 18:11:22'),
('31', '98712', 'false', '2017-01-28 18:11:22'),
('31', '12345', 'false', '2017-01-28 18:11:22'),
('31', '12346', 'false', '2017-01-28 18:11:23'),
('31', '12347', 'false', '2017-01-28 18:11:23'),
('31', '11223', 'false', '2017-01-28 18:11:23'),
('32', '12348', 'true', '2017-01-28 18:11:35'),
('32', '12349', 'false', '2017-01-28 18:11:35'),
('32', '24043', 'false', '2017-01-28 18:11:35'),
('32', '98712', 'false', '2017-01-28 18:11:35'),
('32', '12345', 'false', '2017-01-28 18:11:35'),
('32', '12346', 'false', '2017-01-28 18:11:36'),
('32', '12347', 'false', '2017-01-28 18:11:36'),
('32', '11223', 'true', '2017-01-28 18:11:36'),
('33', '12348', 'true', '2017-01-28 20:59:48'),
('33', '12349', 'false', '2017-01-28 20:59:49'),
('33', '24043', 'false', '2017-01-28 20:59:49'),
('33', '98712', 'false', '2017-01-28 20:59:49'),
('33', '12345', 'false', '2017-01-28 20:59:49'),
('33', '12346', 'false', '2017-01-28 20:59:49'),
('33', '12347', 'false', '2017-01-28 20:59:49'),
('33', '11223', 'true', '2017-01-28 20:59:49'),
('34', '12348', 'false', '2017-01-28 23:42:55'),
('34', '12349', 'false', '2017-01-28 23:42:55'),
('34', '24043', 'false', '2017-01-28 23:42:55'),
('34', '98712', 'false', '2017-01-28 23:42:55'),
('34', '12345', 'false', '2017-01-28 23:42:55'),
('34', '12346', 'false', '2017-01-28 23:42:55'),
('34', '12347', 'false', '2017-01-28 23:42:56'),
('34', '11223', 'true', '2017-01-28 23:42:56');

-- --------------------------------------------------------

--
-- Table structure for table `prof_turma`
--

CREATE TABLE `prof_turma` (
  `matricula` varchar(10) NOT NULL,
  `cod_turma` varchar(5) NOT NULL,
  `disciplina` varchar(20) NOT NULL,
  `ano_letivo` year(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `prof_turma`
--

INSERT INTO `prof_turma` (`matricula`, `cod_turma`, `disciplina`, `ano_letivo`) VALUES
('10', 'IN313', 'Literatura', 2016),
('10', 'IN313', 'Português', 2016),
('10', 'MA215', 'Matematica', 2016);

-- --------------------------------------------------------

--
-- Table structure for table `provas`
--

CREATE TABLE `provas` (
  `cod_prova` int(12) NOT NULL,
  `nome` varchar(30) NOT NULL,
  `matricula` varchar(10) NOT NULL,
  `cod_disciplina` varchar(5) NOT NULL,
  `anoserie` varchar(5) NOT NULL,
  `tipo_avaliacao` varchar(20) NOT NULL,
  `data_mod` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `provas`
--

INSERT INTO `provas` (`cod_prova`, `nome`, `matricula`, `cod_disciplina`, `anoserie`, `tipo_avaliacao`, `data_mod`) VALUES
(1, 'Prova de Modernismo', '10', '2', '3º an', 'Prova', '2016-12-21 23:52:00'),
(2, '', '10', '1', '1º an', 'Prova', '2017-01-05 15:36:08'),
(3, '', '10', '2', '1º an', 'Prova', '2017-01-05 15:36:08'),
(4, '', '10', '3', '1º an', 'Prova', '2017-01-05 15:36:08'),
(5, 'Prova Do tcc', '10', '2', '3º an', 'Prova', '2017-10-12 05:36:51');

-- --------------------------------------------------------

--
-- Table structure for table `prova_questoes`
--

CREATE TABLE `prova_questoes` (
  `cod_prova` varchar(10) NOT NULL,
  `cod_quest` varchar(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `prova_questoes`
--

INSERT INTO `prova_questoes` (`cod_prova`, `cod_quest`) VALUES
('1', '4'),
('1', '5'),
('1', '17'),
('1', '17'),
('1', '15'),
('1', '8'),
('2', '8'),
('3', '8'),
('4', '8'),
('1', '12'),
('2', '12'),
('3', '12'),
('4', '12'),
('1', '15'),
('2', '15'),
('3', '15'),
('4', '15'),
('1', '4'),
('2', '4'),
('3', '4'),
('4', '4'),
('1', '5'),
('2', '5'),
('3', '5'),
('4', '5'),
('1', '10'),
('2', '10'),
('3', '10'),
('4', '10'),
('1', '15'),
('2', '15'),
('3', '15'),
('4', '15'),
('5', '15'),
('1', '4'),
('2', '4'),
('3', '4'),
('4', '4'),
('5', '4'),
('1', '5'),
('2', '5'),
('3', '5'),
('4', '5'),
('5', '5'),
('1', '21'),
('2', '21'),
('3', '21'),
('4', '21'),
('5', '21'),
('1', '27'),
('2', '27'),
('3', '27'),
('4', '27'),
('5', '27'),
('6', '27'),
('1', '4'),
('2', '4'),
('3', '4'),
('4', '4'),
('5', '4'),
('6', '4'),
('1', '27'),
('2', '27'),
('3', '27'),
('4', '27'),
('5', '27'),
('6', '27'),
('7', '27'),
('1', '29'),
('2', '29'),
('3', '29'),
('4', '29'),
('5', '29'),
('6', '29'),
('7', '29'),
('8', '29'),
('9', '29'),
('10', '29'),
('1', '28'),
('2', '28'),
('3', '28'),
('4', '28'),
('5', '28'),
('6', '28'),
('7', '28'),
('8', '28'),
('9', '28'),
('10', '28');

-- --------------------------------------------------------

--
-- Table structure for table `questoes`
--

CREATE TABLE `questoes` (
  `cod_quest` int(12) NOT NULL COMMENT 'codigo associado a questao ( cahave primaria)',
  `autor` varchar(50) NOT NULL COMMENT 'autor da questao; ou cod_prof ou enem,uff etc ',
  `nivel` char(20) NOT NULL COMMENT 'a dificuldade da questao: b>baixo,m>medio,a>alto',
  `tipo` char(20) NOT NULL COMMENT 'd>discursiva e o>objetivas',
  `disciplina_id` varchar(5) NOT NULL,
  `materia_id` varchar(5) NOT NULL,
  `enunciado` text NOT NULL,
  `op1` text,
  `op2` text,
  `op3` text,
  `op4` text,
  `op5` text,
  `gabarito` text NOT NULL,
  `ano_letivo` varchar(4) NOT NULL,
  `anoserie` varchar(20) NOT NULL,
  `visibilidade` varchar(3) NOT NULL COMMENT 'pub:publico ou pri:privado(disponivel somente para o prof criador da questao)',
  `quant_linhas` text NOT NULL,
  `linhas_visiveis` tinyint(1) NOT NULL,
  `data_mod` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `questoes`
--

INSERT INTO `questoes` (`cod_quest`, `autor`, `nivel`, `tipo`, `disciplina_id`, `materia_id`, `enunciado`, `op1`, `op2`, `op3`, `op4`, `op5`, `gabarito`, `ano_letivo`, `anoserie`, `visibilidade`, `quant_linhas`, `linhas_visiveis`, `data_mod`) VALUES
(4, 'Jacinto', 'Mediana', 'Discursiva', '2', '1', 'EU NÃO AGUENTO MAIS ERROS4', '', '', '', '', '', 'asdjsauhdsakjdh', '2016', '3º ano', 'Púb', '', 0, '2016-10-13 04:10:49'),
(5, 'Jacinto', 'Mediana', 'Discursiva', '2', '1', 'EU NÃO AGUENTO MAIS ERROS5', '', '', '', '', '', 'asdjsauhdsakjdh', '2016', '3º ano', 'Púb', '', 0, '2016-10-13 04:10:51'),
(7, 'Jacinto', 'Mediana', 'Discursiva', '2', '1', 'Portugues é uma droga?', '', '', '', '', '', 'sim', '2016', '3º ano', 'Pri', '', 0, '2017-01-06 22:59:46'),
(8, 'Jacinto', 'Mediana', 'Discursiva', '2', '1', '1212', '', '', '', '', '', 'asdasd', '2016', '1º ano', 'Pri', '', 0, '2016-10-14 17:15:07'),
(10, 'Jacinto', 'Mediana', 'Discursiva', '2', '1', 'ghgvheh', '', '', '', '', '', '452642', '2016', '3º ano', 'Púb', '', 0, '2016-12-10 03:38:24'),
(11, 'Jacinto', 'Mediana', 'Discursiva', '2', '1', 'vbnvbnvbn', '', '', '', '', '', 'asdasdasd', '2016', '3º ano', 'Púb', '', 0, '2016-12-10 03:44:52'),
(13, 'Jacinto', 'Mediana', 'Discursiva', '2', '1', 'yuiyuiyui', '', '', '', '', '', 'undefined', 'unde', '3º ano', 'Púb', '', 0, '2016-12-10 03:49:14'),
(14, 'Jacinto', 'Mediana', 'Discursiva', '2', '1', 'yuiyuiyui', '', '', '', '', '', 'qweqweqwe', '2016', '3º ano', 'Púb', '', 0, '2016-12-10 03:49:14'),
(15, 'Jacinto', 'Mediana', 'Objetiva', '2', '1', 'asdasdasd', '1', '2', '3', '4', '5', 'C', '2016', '3º ano', 'Púb', '', 0, '2016-12-11 18:20:23'),
(17, 'Jacinto', 'Mediana', 'DiscursivaCALC', '3', '2', 'Quanto  é 1+1?', NULL, NULL, NULL, NULL, NULL, '2', '2016', '3º ano', 'Púb', '', 0, '2016-12-12 22:04:28'),
(18, 'Jesus', 'Média', 'Discursiva', '2', '1', 'dsghuihfduih', NULL, NULL, NULL, NULL, NULL, 'huhsdfaiudshiadshdsaiudsa', '1851', '2º ano', 'Pri', '16', 1, '2017-01-06 22:26:19'),
(19, 'Jesus', 'Média', 'Discursiva', '2', '1', 'lllllllllllllllllll', NULL, NULL, NULL, NULL, NULL, 'lllllllllllllllllllllll', '1837', '2º ano', 'Pri', '-9', 0, '2017-01-06 22:45:20'),
(25, '10', 'Fácil', 'Discursiva', '2', '1', 'ddddddddddd', NULL, NULL, NULL, NULL, NULL, 'ddddddddddddddddddddddddddddd', '1964', '2º ano', 'Pri', '9', 1, '2017-01-11 19:06:14'),
(26, '10', 'Média', 'Discursiva', '2', '1', 'Aheooooooooooo', NULL, NULL, NULL, NULL, NULL, 'Sim, sim', '1860', '2º ano', 'Pri', '12', 1, '2017-01-13 15:48:45'),
(27, '10', 'Média', 'Discursiva', '2', '1', 'aiushdas', NULL, NULL, NULL, NULL, NULL, '6128736', '2017', '3º ano', 'Púb', '2', 0, '2017-01-20 19:09:28'),
(28, '10', 'Dificil', 'Discursiva', '2', '1', 'teste', NULL, NULL, NULL, NULL, NULL, 'oi', '2017', '3º ano', 'Púb', '2', 1, '2017-02-03 05:57:35'),
(29, '10', 'Media', 'Objetiva', '2', '1', 'fsdf', 'asdf', 'asdf', 'asdf', 'asdf', 'afd', 'Opção C', '2017', '3º ano', 'Púb', '', 0, '2017-02-03 06:00:34');

-- --------------------------------------------------------

--
-- Table structure for table `tipo_prova`
--

CREATE TABLE `tipo_prova` (
  `tipo_avaliacao` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tipo_prova`
--

INSERT INTO `tipo_prova` (`tipo_avaliacao`) VALUES
('1° certificação '),
('1° certificação recuperação '),
('2° certificação '),
('2° certificação recuperação '),
('3° certificação '),
('3° certificação recuperação ');

-- --------------------------------------------------------

--
-- Table structure for table `turma`
--

CREATE TABLE `turma` (
  `cod_turma` varchar(5) NOT NULL,
  `anoserie` varchar(6) NOT NULL,
  `email` varchar(100) NOT NULL,
  `sala` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `turma`
--

INSERT INTO `turma` (`cod_turma`, `anoserie`, `email`, `sala`) VALUES
('IN313', '3º', 'turmain1142014@gmail.com', '12-B'),
('MA313', '3º', '', '13-B');

-- --------------------------------------------------------

--
-- Table structure for table `turma_aluno`
--

CREATE TABLE `turma_aluno` (
  `cod_turma` varchar(5) NOT NULL,
  `matricula` varchar(5) NOT NULL,
  `ano_letivo` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `turma_aluno`
--

INSERT INTO `turma_aluno` (`cod_turma`, `matricula`, `ano_letivo`) VALUES
('IN313', '24043', '2016-01-01'),
('IN313', '11223', '2016-01-01'),
('IN313', '01673', '2016-01-01'),
('IN313', '98712', '2016-01-01'),
('IN313', '12345', '0000-00-00'),
('IN313', '12346', '0000-00-00'),
('IN313', '12347', '0000-00-00'),
('IN313', '12348', '0000-00-00'),
('IN313', '12349', '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `user_photo`
--

CREATE TABLE `user_photo` (
  `matricula` varchar(10) NOT NULL,
  `photoID` text NOT NULL,
  `data_mod` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_photo`
--

INSERT INTO `user_photo` (`matricula`, `photoID`, `data_mod`) VALUES
('10', '/uploads/10-userPhoto-1483162242715.jpg', '2016-12-31 05:30:42'),
('25', './uploads/25-userPhoto-1481673375785.png', '2016-12-13 23:56:15');

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `matricula` varchar(10) NOT NULL,
  `username` varchar(50) NOT NULL,
  `salt` char(200) NOT NULL,
  `senha` char(129) NOT NULL,
  `permissao` varchar(15) NOT NULL,
  `data_mod` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`matricula`, `username`, `salt`, `senha`, `permissao`, `data_mod`) VALUES
('10', 'Jesus', '07dd16ba40d8735f', '71eedb8d0069cba18ea93144855ca878f5c1860a668dc48716bc6ca6f29615af51ceb31b9cf538b2ce008dc744b408e78dfc2ae11097b18199e6161aecb570ea', 'Professor', '2017-10-12 05:31:23'),
('25', 'ADM', '07dd16ba40d8735f', '71eedb8d0069cba18ea93144855ca878f5c1860a668dc48716bc6ca6f29615af51ceb31b9cf538b2ce008dc744b408e78dfc2ae11097b18199e6161aecb570ea', 'Administrador', '2017-10-12 06:05:51');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `aluno`
--
ALTER TABLE `aluno`
  ADD PRIMARY KEY (`matricula`);

--
-- Indexes for table `aluno_nota`
--
ALTER TABLE `aluno_nota`
  ADD PRIMARY KEY (`matricula`,`disciplina_id`);

--
-- Indexes for table `aluno_nota_tri`
--
ALTER TABLE `aluno_nota_tri`
  ADD PRIMARY KEY (`matricula`,`disciplina_id`,`ano`);

--
-- Indexes for table `calendario`
--
ALTER TABLE `calendario`
  ADD PRIMARY KEY (`cod_evento`);

--
-- Indexes for table `disciplinas`
--
ALTER TABLE `disciplinas`
  ADD PRIMARY KEY (`disciplina_id`);

--
-- Indexes for table `lembretes`
--
ALTER TABLE `lembretes`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `materia`
--
ALTER TABLE `materia`
  ADD PRIMARY KEY (`materia_id`);

--
-- Indexes for table `professor_disciplinas`
--
ALTER TABLE `professor_disciplinas`
  ADD PRIMARY KEY (`matricula`,`disciplina_id`,`ano_letivo`);

--
-- Indexes for table `profs`
--
ALTER TABLE `profs`
  ADD PRIMARY KEY (`matricula`);

--
-- Indexes for table `prof_diario`
--
ALTER TABLE `prof_diario`
  ADD PRIMARY KEY (`cod_aula`);

--
-- Indexes for table `prof_turma`
--
ALTER TABLE `prof_turma`
  ADD PRIMARY KEY (`matricula`,`cod_turma`,`disciplina`,`ano_letivo`);

--
-- Indexes for table `provas`
--
ALTER TABLE `provas`
  ADD PRIMARY KEY (`cod_prova`);

--
-- Indexes for table `questoes`
--
ALTER TABLE `questoes`
  ADD PRIMARY KEY (`cod_quest`);

--
-- Indexes for table `turma`
--
ALTER TABLE `turma`
  ADD PRIMARY KEY (`cod_turma`);

--
-- Indexes for table `user_photo`
--
ALTER TABLE `user_photo`
  ADD PRIMARY KEY (`matricula`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`matricula`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `calendario`
--
ALTER TABLE `calendario`
  MODIFY `cod_evento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT for table `disciplinas`
--
ALTER TABLE `disciplinas`
  MODIFY `disciplina_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `prof_diario`
--
ALTER TABLE `prof_diario`
  MODIFY `cod_aula` int(12) NOT NULL AUTO_INCREMENT COMMENT 'codigo associado a questao ( cahave primaria)', AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `provas`
--
ALTER TABLE `provas`
  MODIFY `cod_prova` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `questoes`
--
ALTER TABLE `questoes`
  MODIFY `cod_quest` int(12) NOT NULL AUTO_INCREMENT COMMENT 'codigo associado a questao ( cahave primaria)', AUTO_INCREMENT=30;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
