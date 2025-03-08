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
      // await secondInstance!.save()
      try {
            await secondInstance!.save();
          } catch (err) {
            return;
          }
      throw new Error("should not reach this point")

})