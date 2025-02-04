// Плавная прокрутка //
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// hamburger //
window.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".menu"),
    headerLogo = document.querySelector(".header-logo"),
    menuLogo = document.querySelector(".menu-logo"),
    menuItem = document.querySelectorAll(".menu-link, .menu-close, .menu-logo"),
    menuList = document.querySelector(".menu-list"),
    header = document.querySelector(".header__wrapper"),
    overlayHeader = document.querySelector(".header__overlay"),
    hamburger = document.querySelector(".hamburger"),
    close = document.querySelector(".menu-close");
  function menuActive() {
    if (window.innerWidth < 992) {
      hamburger.addEventListener("click", () => {
        menuLogo.style.display = "flex";
        headerLogo.style.display = "none";
        hamburger.classList.add("hamburger_active");
        header.classList.add("header__wrapper_active");
        overlayHeader.style.display = "block";
        menu.style.display = "flex";
        menu.classList.add("menu_active");
        menuList.classList.add("menu_active-list");
        close.style.display = "block";
      });

      menuItem.forEach((item) => {
        item.addEventListener("click", (event) => {
          event.preventDefault();
          menuLogo.style.display = "none";
          headerLogo.style.display = "flex";
          hamburger.classList.remove("hamburger_active");
          header.classList.remove("header__wrapper_active");
          overlayHeader.style.display = "none";
          menu.classList.remove("menu_active");
          menuList.classList.remove("menu_active-list");
          close.style.display = "none";
          menu.style.display = "none";
          const href = item.getAttribute("href");
          if (href && href.startsWith("#")) {
            document.querySelector(href)?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          } else if (href) {
            window.location.href = href;
          }
        });
      });
    }
  }
  window.addEventListener("load", menuActive);
  window.addEventListener("resize", menuActive);
});

// form //
function validateFormAndSubmit(formSelector) {
  const form = document.querySelector(formSelector);

  if (!form) return; // Проверяем, существует ли форма

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Отключаем стандартное поведение отправки формы

    let isValid = true; // Флаг валидности формы

    // Удаляем старые ошибки (удаляем класс)
    form.querySelectorAll(".error-input").forEach((input) => {
      input.classList.remove("error-input");
    });

    // Валидация имени
    const nameInput = form.querySelector("[name='name']");
    if (nameInput) {
      if (nameInput.value.trim() === "" || nameInput.value.trim().length < 2) {
        isValid = false;
        nameInput.classList.add("error-input");
      }
    }

    // Валидация email
    const emailInput = form.querySelector("[name='email']");
    if (emailInput) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (
        emailInput.value.trim() === "" ||
        !emailPattern.test(emailInput.value.trim())
      ) {
        isValid = false;
        emailInput.classList.add("error-input");
      }
    }

    // Проверка чекбокса
    const privacyCheckbox = form.querySelector("[name='privacy']");
    if (privacyCheckbox && !privacyCheckbox.checked) {
      isValid = false;
      privacyCheckbox.classList.add("error-input");
    }

    // Если форма невалидна, показываем ошибки и не отправляем данные
    if (!isValid) {
      console.log("Заполните все поля правильно.");
      return;
    }

    // Если форма валидна, отправляем данные
    const formData = new FormData(form);

    // Отправка данных через Fetch API
    fetch("./mailer/smart.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка отправки формы");
        }
        return response.text();
      })
      .then(() => {
        // Очищаем поля формы
        form.querySelectorAll("input").forEach((input) => (input.value = ""));

        // Показываем окно "Спасибо"
        document.querySelector(".consultation-form").style.display = "none";
        document.querySelector(".consultation__subheader").style.display =
          "none";
        document.querySelector(".consultation-thanks").style.display = "flex";

        // Сбрасываем форму только после успешной отправки
        form.reset();
      })
      .catch((error) => {
        console.error("Ошибка:", error);
      });
  });
}
validateFormAndSubmit("#form");
