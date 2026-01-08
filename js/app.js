const DATA_URL = "data/equicite_mvp_dataset.json"; // <-- make sure this path is correct

function escapeRegex(s){ return String(s).replace(/[.*+?^${}()|[\]\\]/g,'\\$&'); }
function uniqueValues(rows, field, numeric=false){
  const vals = Array.from(new Set(rows.map(r=>r?.[field]).filter(v=>v!==''&&v!=null)));
  if(numeric){ return vals.map(Number).filter(n=>!Number.isNaN(n)).sort((a,b)=>a-b); }
  return vals.sort((a,b)=>String(a).localeCompare(String(b)));
}
function buildMultiSelect(id,labelText,options){
  const wrap=document.createElement('div'); wrap.className='filter-block';
  const label=document.createElement('label'); label.htmlFor=id; label.textContent=labelText;
  const select=document.createElement('select'); select.id=id; select.multiple=true;
  const ph=document.createElement('option'); ph.textContent='— select one or more —'; ph.disabled=true; select.appendChild(ph);
  options.forEach(v=>{ const o=document.createElement('option'); o.value=v; o.textContent=v; select.appendChild(o); });
  wrap.append(label,select); return wrap;
}

(async function(){
  try{
    const resp = await fetch(DATA_URL, { cache: "no-store" });
    if(!resp.ok) throw new Error('Failed to load data: '+resp.status);
    const rows = await resp.json();

    // DataTables
    const dt = new DataTable('#myTable', {
      data: rows,
      pageLength: 25,
      deferRender: true,
      columns: [
        { data: 'title', title: 'Title', defaultContent: '' },
        { data: 'publication_year', title: 'Year', defaultContent: '' },
        { data: 'cited_by_count', title: 'Citation Count', defaultContent: 0 },
        { data: 'type', title: 'Type', defaultContent: '' },
        { data: 'primary_topic', title: 'Primary Topic', defaultContent: '' },
        { data: 'hbcu', title: 'HBCU', defaultContent: '' },
        {
          data: 'oa_url',
          title: 'Open Access',
          defaultContent: '—',
          render: (data, type, row) => {
            if (!data) return '—';
            const isPdf = /\.pdf(\?|$)/i.test(data);
            const text  = isPdf ? 'View PDF' : 'Link';
            // show plain text during filtering to keep regex simple
            if (type === 'filter') return isPdf ? 'View PDF' : 'Link';
            return `<a href="${data}" target="_blank" rel="noopener" class="oa-link">${text}</a>`;
;
          }
        },
        {
          data: 'citation',
          title: 'MLA Citation',
          defaultContent: '',
          render: (data, type, row) => {
            if (type === 'display') {
              const safe = (data || '').replace(/"/g, '&quot;');
              return `
                <div class="d-flex align-items-center gap-2">
                  <span class="text-truncate" style="max-width:520px;" title="${safe}">${safe}</span>
                  <button class="btn btn-sm btn-outline-secondary btn-copy" data-cite="${safe}">Copy</button>
                </div>
              `;
            }
            return data || '';
          }
        }
      ],
      order: [[1, 'desc'], [2, 'desc']]
    });

    document.addEventListener("click", (e) => {
        const a = e.target.closest(".oa-link");
        if (!a) return;
        if (typeof track === "function") track("open_access_click", { href: a.href });
      });

      dt.on("search.dt", function () {
        const q = dt.search();
        if (q && q.length >= 3 && typeof track === "function") track("search", { q });
      });
      
      

    // Filters config (match your JSON fields)
    const cfg = [
      { id:'f_hbcu', label:'HBCU', field:'hbcu', col:5 },
      { id:'f_type', label:'Type', field:'type', col:3 },
      { id:'f_year', label:'Year', field:'publication_year', col:1, numeric:true },
      { id:'f_topic', label:'Primary Topic', field:'primary_topic', col:4 }
    ];

    // Build filter UI
    const bar = document.getElementById('filterBar');
    cfg.forEach(c=>{
      const options = uniqueValues(rows, c.field, !!c.numeric);
      const list = c.numeric ? options.map(String).reverse() : options;
      const block = buildMultiSelect(c.id, c.label, list);
      bar.appendChild(block);

      block.querySelector('select').addEventListener('change', function(){
        const selected = Array.from(this.selectedOptions).filter(o=>!o.disabled).map(o=>o.value);
        if(!selected.length){ dt.column(c.col).search('').draw(); return; }
        if (typeof track === "function") track("filter_change", { field: c.field, values: selected });
        const pattern = `^(${selected.map(escapeRegex).join('|')})$`;
        dt.column(c.col).search(pattern, true, false).draw();
      });
    });

    // Reset filters
    document.getElementById('clearFilters').addEventListener('click', ()=>{
      cfg.forEach(c=>{
        const sel=document.getElementById(c.id);
        Array.from(sel.options).forEach(o=>o.selected=false);
        dt.column(c.col).search('');
      });
      dt.draw();
    });

    // Copy citation buttons
    document.getElementById('myTable').addEventListener('click', async (e)=>{
      const btn = e.target.closest('.btn-copy');
      if(!btn) return;
      try{
        await navigator.clipboard.writeText(btn.getAttribute('data-cite') || '');
        btn.textContent = 'Copied!';
        setTimeout(()=>btn.textContent='Copy', 1200);
      }catch(err){
        console.error(err);
        btn.textContent = 'Error';
        setTimeout(()=>btn.textContent='Copy', 1200);
      }
    });

  }catch(err){
    console.error(err);
    alert("Could not load the dataset. Open the browser console for details.");
  }
})();