const findPos=(arr,index,sortedIndex)=>
{
    let output=sortedIndex;//offset by already sorted area
    for(let i=sortedIndex;i<arr.length;i++)
    {
        if(arr[i]<arr[index])
        {
            output++;
        }
    }
    return output;
}

class node
{
    constructor(val)
    {
        this.value=val;
        this.next=null;
    }
    setNext(nextNode)
    {
        this.next=nextNode;
    }
}

class minNodeChain
{
    constructor()
    {
        this.top=null;
    }
    constructor(topNode)
    {
        this.top=topNode;
    }
    insert(val)
    {
        const addNode=new node(val);
        if(this.top===null)//if empty then just put on top
        {
            this.top=addNode;
            return;
        }
        var prev=null;
        var current=this.top;
        while(current.value<=val&&current.next!=null)//go until the next node is higher then this one
        {
            prev=current;
            current=current.next;
        }
        if(prev!==null)//it is not the first node
        {
            prev.next=addNode;
        }
        addNode.next=current;
    }
    pop()
    {
        temp=this.top;
        this.top=this.top.next;
        return temp;
    }
    peek()
    {
        return this.top;
    }
}

const cycleSortNodeSkip=(arr)=>
{
    let numSorted=0;
    const indexsVisited=new minNodeChain();
    for(let i=0;i<arr.length;i++)
    {
        let pos=findPos(arr,i,i);
        while(pos!==i)
        {
            [arr[i],arr[pos]]=[arr[pos],arr[i]];//swap to final position
            if(++numSorted>=arr.length)//check if done sorting
            {
                return arr;
            }
            pos=findPos(arr,pos,i);//find the position of the swapped element
        }
    }
    return arr;
}

const cycleSortArraySkip=(arr)=>
{
    let numSorted=0;
    const indexsVisited=Array.apply(null, Array(partition)).map(()=>
    {
        return false;
    });
    for(let i=0;i<arr.length;i++)
    {
        if(indexsVisited[pos])//if visited already then move to next loop
        {
            continue;
        }
        let pos=findPos(arr,i,i);//find position of this element
        while(pos!==i)
        {
            [arr[i],arr[pos]]=[arr[pos],arr[i]];//swap to final position
            if(++numSorted>=arr.length)//check if done sorting
            {
                return arr;
            }
            indexsVisited[pos]=true;
            pos=findPos(arr,pos,i);//find the position of the swapped element
        }
    }
    return arr;
}

