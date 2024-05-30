document.addEventListener('DOMContentLoaded', () => {
			
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
        el.addEventListener('click', () => {

          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);

          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');

        });
    });
      
    // Functions to open and close a modal
    function openModal($el) {
        $el.classList.add('is-active');
    }

    function closeModal($el) {
        $el.classList.remove('is-active');
    }

    function closeAllModals() {
        (document.querySelectorAll('.modal') || []).forEach(($modal) => {
          closeModal($modal);
        });
    }
    
    
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.modal-open') || []).forEach(($trigger) => {
        const modal = $trigger.dataset.target;
        const $target = document.getElementById(modal);

        $trigger.addEventListener('click', () => {
          openModal($target);
        });
    });

    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button:not(.no-close)') || []).forEach(($close) => {
        const $target = $close.closest('.modal');

        $close.addEventListener('click', () => {
          closeModal($target);
        });
    });

    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
        if(event.key === "Escape") {
          closeAllModals();
        }
    });
      
    // Submit pledge data
    const scriptURL = 'https://script.google.com/macros/s/AKfycbymlz7lGxWKQ30wCKc7vtmwzl_Jvfclepq2yzD5i0b-RwpwPkIwRC6CmC0S6p_Lia2Hiw/exec';
    const pledgeForm = document.querySelector('#pledge-form');
    const pledgeText = document.getElementById('pledge-text');
    const pledgeSubmit = document.getElementById('pledge-submit');
    const pledgeClose = document.getElementById('pledge-close');
    
    function showPledgeProgress() {
        pledgeText.innerHTML = '<progress class="progress is-primary is-small" max="100">30%</progress>';				
    }
    
    function showPledgeSuccess() {
        pledgeText.innerHTML = '<p class="has-text-weight-semibold is-size-4 has-text-success-35">Thank you for your interest in supporting Maritimes Durgabari! Our team will reach out to you.</p>';				
        pledgeSubmit.classList.add('is-hidden');
        pledgeClose.innerHTML = 'Close';
    
    }
    
    function showPledgeFailure() {
        pledgeText.innerHTML = '<p class="has-text-weight-semibold is-size-4 has-text-primary-45">Unfortunately we could not save the details. We would appreciate you reaching our team mentioned at the Contact section.</p>';
    }
    
    async function submitPledgeForm() {
        try {
            const response = await fetch(scriptURL, {
                        method: "POST",
                        mode: "no-cors",
                        cache: "no-cache",
                        redirect: "follow", 
                        body: new FormData(pledgeForm),
            });

            //if (!response.ok) {
                //throw new Error("API response was not OK");
            //}
            
            showPledgeSuccess();					
        } 
        catch (error) {
            showPledgeFailure();
        }				
    }
    
    pledgeForm.addEventListener('submit', e => {
        e.preventDefault();
        showPledgeProgress();
        submitPledgeForm();				
    });
	
});

const backtotoplink = document.getElementById('gotop')
const onScroll = () => {
  const scroll = document.documentElement.scrollTop
  if (scroll > 0) {
    backtotoplink.classList.add("active");
  } else {
    backtotoplink.classList.remove("active")
  }
}
window.addEventListener('scroll', onScroll)