import User from "../models/UserSchema";
import Trainer from "../models/TrainerSchema";
import Booking from "../models/BookingSchema";
import Stripe from "stripe";

export const getCheckoutSession = async (req: any, res: any) => {
  try {
    // get currently booked trainer
    const trainer = await Trainer.findById(req.params.trainerId);
    const user = await User.findById(req.userId);

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    // create stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
      cancel_url: `${req.protocol}://${req.get("host")}/trainers/${
        trainer?.id
      }`,
      customer_email: user?.email,
      client_reference_id: req.params.trainerId,
      line_items: [
        {
          price_data: {
            currency: "idr",
            unit_amount: trainer?.ticketPrice! * 100,
            product_data: {
              name: `${trainer?.name}`,
              description: `${trainer?.bio}`,
              images: [`${trainer?.photo}`],
            },
          },
          quantity: 1,
        },
      ],
    });

    // create new booking
    const booking = new Booking({
      trainer: trainer?._id,
      user: user?._id,
      ticketPrice: trainer?.ticketPrice,
      session: session.id,
    });

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking success",
      session,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: true,
      message: "Error creating checkout session",
    });
  }
};
