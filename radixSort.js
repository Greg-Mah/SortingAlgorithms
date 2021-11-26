const sortCheck=(array)=>
{
    if(array.length>=2)
    {
        for(let i=0;i<array.length-1;i++)
        {
            if(array[i]>array[i+1])
            {
                return false;
            }
        }
    }
    return true
}

const getBucket=(number,section,partition)=>
{
    return Math.floor((number/section)%partition);
}

const numberRadixSort=(unsorted,partition)=>
{
    let sorted=new Array(unsorted.length);
    const buckets=Array.apply(null, Array(partition)).map(()=>
    {
        return 0;
    });
    let section=1;
    while(!sortCheck(unsorted))
    {
        for(let i=0;i<unsorted.length;i++)//find out how many fit into each bucket
        {
            buckets[getBucket(unsorted[i],section,partition)]++;
        }
        let sortedIndex=0;
        for(let i=0;i<buckets.length;i++)//empty each bucket to fill second array
        {
            let unsortedIndex=0;
            while(buckets[i]>0&&unsortedIndex<unsorted.length)//empty a single
            {
                if(getBucket(unsorted[unsortedIndex],section,partition)===i)
                {
                    sorted[sortedIndex++]=unsorted[unsortedIndex];
                    buckets[i]--;
                }
                unsortedIndex++;
            }
        }
        [unsorted,sorted]=[sorted,unsorted];//swap arrays
        section*=partition;
    }
    return unsorted;
}

let sortable=[134,654,123,6784,312,12,3564,12,45,1,321,587,3,35,23,54];

console.log(numberRadixSort(sortable,10));

let sortable2=[0,1,2,3,4,5,6,7,8,9,10];
console.log(numberRadixSort(sortable2,10));

let sortable3=[10,9,8,7,6,5,4,3,2,1,0];
console.log(numberRadixSort(sortable3,10));