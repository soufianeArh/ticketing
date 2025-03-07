import { Ticket } from "../Ticket";
it ("implement optimistic concurency logic by versionning and respecting version after save ", async ()=>{
      //create ticket+ save
      const ticket = Ticket.build({
            userId:"1223213c",
            price:5,
            title:"myTitle"
      })
      await ticket.save()
      console.log(ticket)
      //fetch twice the ticket
      const firstInstance = await Ticket.findById(ticket.id);
      const secondInstance = await Ticket.findById(ticket.id);

      //and update twice --
      firstInstance!.set({price:10});
      secondInstance!.set({price:20});

      //save firstinstance
      await firstInstance!.save()
      //save secondInstance => error 
      //this shall fail=> because in db that record has v2 and i want to save a v2 too
      //i must save based on v3
      // try {
      //       await secondInstance!.save();
      //     } catch (err) {
      //       return;
      //     }
       await secondInstance!.save()

})