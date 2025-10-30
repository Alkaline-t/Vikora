// Tile form modal behavior
(function(){
  function $(sel, root=document){ return root.querySelector(sel); }
  function $all(sel, root=document){ return Array.from(root.querySelectorAll(sel)); }

  const modal = $('#tileFormModal');
  const backdrop = modal && modal.querySelector('.tile-modal-backdrop');
  const panel = modal && modal.querySelector('.tile-modal-panel');
  const subjectSpan = $('#tileSubject');
  const subjectInput = $('#tileFormSubject');
  const form = $('#tileModalForm');

  function openModalFor(title){
    if(!modal) return;
    modal.setAttribute('aria-hidden','false');
    subjectSpan.textContent = title;
    subjectInput.value = title;
    // focus first input
    const first = form.querySelector('input[name="name"]');
    first && first.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeModal(){
    if(!modal) return;
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }

  // Wire up clickable cards
  $all('.clickable-card').forEach(card => {
    card.addEventListener('click', ()=> openModalFor(card.dataset.cardTitle || card.textContent.trim()));
    card.addEventListener('keypress', (e)=>{ if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModalFor(card.dataset.cardTitle || card.textContent.trim()); } });
  });

  // Close handlers
  $all('[data-close-modal]').forEach(el => el.addEventListener('click', closeModal));
  // click outside panel
  backdrop && backdrop.addEventListener('click', closeModal);
  // escape key
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeModal(); });

  // handle submit - for now just log and close
  form && form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    for(const [k,v] of data.entries()) obj[k]=v;
    console.log('Tile form submitted:', obj);
    // simple success feedback
    const submitBtn = form.querySelector('[type="submit"]');
    submitBtn && (submitBtn.disabled = true);
    submitBtn && (submitBtn.textContent = 'Sent');
    setTimeout(()=>{
      submitBtn && (submitBtn.disabled = false);
      submitBtn && (submitBtn.textContent = 'Send');
      form.reset();
      closeModal();
    }, 900);
  });
})();
