 /*
 Author: Ajay Badgujar
 Website: https://wwww.ajaybadgujar.com/
 */
 class Pagination{
    constructor(options){
        
        this.id = options.id; 
        this.element = document.getElementById(this.id);
        this.tableID = options.tableID;
        this.tableBody = document.querySelector("#"+this.tableID+" tbody");
        this.tableElement = document.getElementById(this.tableID);
        this.nextButton = this.element.getElementsByClassName('next')[0];
        this.prevButton = this.element.getElementsByClassName('previous')[0];
        this.paginationLabel = this.element.getElementsByClassName('pagination-label')[0];
        this.cmbRowCount = this.element.querySelector(".cmb-row-count");
        this.noOfRows = options.noOfRows;     
        
        
        //default values        
        this.start = 1;
        this.end = this.noOfRows;
        this.currentPageNo = 1;
        this.init();
    }

    init(){        
        this.collectingTableInfo();
        this.addEvents(); 
              
    }

    collectingTableInfo(){
        
        this.totalRows = document.querySelectorAll("#"+this.tableID+" tbody tr");
        this.totalNoOfRows = this.totalRows.length;
        
        if(this.totalNoOfRows <= this.noOfRows){            
            this.element.style.display = 'none';
        }else{
            this.showRows(this.totalRows, this.start, this.end); 
            
            this.generatePageButtons();
        }
    }

    generatePageButtons(){

        this.currentPageNo = 1;

        let noOfPages = Math.ceil(this.totalNoOfRows / this.noOfRows);

        // remove pre generated buttons if exist
        this.element.querySelectorAll(".btn-page").forEach(element => {
            element.remove();
        });

    

        for(let i=1; i<=noOfPages; i++){
            let a = document.createElement('a');
            a.href = "#";
            a.setAttribute('data-page', i);
            a.className = "round btn-page";
            if(i === this.currentPageNo){
                a.classList.add("active");
            }
            a.innerHTML = i;
            a.addEventListener('click', (e)=>this.jumpToPage(e));
            this.element.querySelector(".middle").insertBefore(a, this.element.querySelector('.next'));
            
        }

    }

    addEvents(){
        this.nextButton.addEventListener('click', ()=>this.onNext());
        this.prevButton.addEventListener('click', ()=>this.onPrevious());

        this.cmbRowCount.addEventListener('change', (e)=>this.onRowCountChange(e));
    }

    onNext(){
        
        this.start = this.end + 1;
        this.end = this.start + this.noOfRows - 1;

        if(this.end >= this.totalNoOfRows){
            this.end = this.totalNoOfRows;                     
        }       
        this.showRows(this.totalRows, this.start, this.end); 
    }

    onPrevious(){
        
        if(this.start > 1){
            this.start = this.start - this.noOfRows;
            this.end = this.start + this.noOfRows - 1;
        }

        this.showRows(this.totalRows, this.start, this.end);

    }

    jumpToPage(e){
        let page = parseInt(e.target.getAttribute('data-page'));
        this.currentPageNo = page;
        this.start = ((page - 1) * this.noOfRows) + 1;
        this.end = this.start + this.noOfRows - 1;

        document.querySelector(".btn-page.active").classList.remove('active');
        e.target.classList.add('active');

        this.showRows(this.totalRows, this.start, this.end);
    }

    onRowCountChange(e){
        this.noOfRows = parseInt(e.target.value);
        this.generatePageButtons();
        this.start = 1;
        this.end = this.noOfRows;
        this.showRows(this.totalRows, this.start, this.end); 
    }

    showRows(rows, start, end){
        
        start = start -1;
        end = end - 1;         

        this.tableBody.innerHTML = "";

        for(let i=0; i<rows.length; i++ ){
            if(i >= start && i <= end){
                this.tableBody.appendChild(rows[i]);                
            }           
        }

        this.updatePagination();
    }

    updatePagination(){

       if(this.end == this.totalNoOfRows ){
           this.nextButton.style.display = 'none';
       }else{
        this.nextButton.style.display = 'block';
       }     

       if(this.start == 1){
            this.prevButton.style.display = 'none';
        }else{
            this.prevButton.style.display = 'block';
        }    

       this.paginationLabel.innerHTML = "Viewing <span>"+this.start+"-"+this.end+"</span> of <span>"+this.totalNoOfRows+"</span>"; 
    }
}