documentosempleadosempleadosempleados
-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`documentos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`documentos` (
  `idDoc` INT NOT NULL AUTO_INCREMENT,
  `doc` VARCHAR(10) NULL,
  PRIMARY KEY (`idDoc`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`roles` (
  `idrol` INT NOT NULL AUTO_INCREMENT,
  `rol` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idrol`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`usuarios` (
  `documento` INT NOT NULL,
  `nombre1` VARCHAR(45) NOT NULL,
  `nombre2` VARCHAR(45) NULL,
  `apellido1` VARCHAR(45) NOT NULL,
  `apellido2` VARCHAR(45) NULL,
  `telefono` INT NULL,
  `contrasenia` VARCHAR(64) NOT NULL,
  `documentos_idDoc` INT NOT NULL,
  `roles_idrol` INT NOT NULL,
  PRIMARY KEY (`documento`),
  INDEX `fk_usuarios_documentos_idx` (`documentos_idDoc` ASC),
  INDEX `fk_usuarios_roles1_idx` (`roles_idrol` ASC),
  CONSTRAINT `fk_usuarios_documentos`
    FOREIGN KEY (`documentos_idDoc`)
    REFERENCES `mydb`.`documentos` (`idDoc`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuarios_roles1`
    FOREIGN KEY (`roles_idrol`)
    REFERENCES `mydb`.`roles` (`idrol`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`empleados`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`empleados` (
  `documento` INT NOT NULL,
  `nombre1` VARCHAR(45) NOT NULL,
  `nombre2` VARCHAR(45) NULL,
  `apellido1` VARCHAR(45) NOT NULL,
  `apellido2` VARCHAR(45) NULL,
  `telefono` INT NOT NULL,
  PRIMARY KEY (`documento`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Citas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Citas` (
  `empleados_documento` INT NOT NULL,
  `usuarios_documento` INT NOT NULL,
  `fecha` DATE NOT NULL,
  `hora` TIME NOT NULL,
  `motivo` VARCHAR(45) NULL,
  PRIMARY KEY (`empleados_documento`, `usuarios_documento`),
  INDEX `fk_empleados_has_usuarios_usuarios1_idx` (`usuarios_documento` ASC) ,
  INDEX `fk_empleados_has_usuarios_empleados1_idx` (`empleados_documento` ASC) ,
  CONSTRAINT `fk_empleados_has_usuarios_empleados1`
    FOREIGN KEY (`empleados_documento`)
    REFERENCES `mydb`.`empleados` (`documento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_empleados_has_usuarios_usuarios1`
    FOREIGN KEY (`usuarios_documento`)
    REFERENCES `mydb`.`usuarios` (`documento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
