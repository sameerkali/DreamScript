// import { auth } from "@clerk/nextjs";
// import { NextResponse } from "next/server";
// // import { Configuration, OpenAIApi } from "openai";
// import OpenAI from 'openai';


// // const configuration = Configuration({
// //   apiKey: process.env.OPENAI_API_KEY
// // });

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
// });

// export async function POST(req: Request) {
//   try {
//     const { userId } = auth();
//     const body = await req.json();
//     const { messages } = body;

//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }
//     if (!openai.apiKey) {
//       return new NextResponse("OpenAI API Key not configured.", {
//         status: 500
//       });
//     }

//     if (!messages) {
//       return new NextResponse("Messages are required", { status: 400 });
//     }

//     const chatCompletion = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [{"role": "user", "content": "Hello!"}],
//     });
//     console.log(chatCompletion.choices[0].message);


//     return NextResponse.json(chatCompletion.choices[0].message);



//   } 
  
  
  
//   catch (error) {
//     console.log("[conversation error]", error);
//     return new NextResponse("Internal error in api/conversation/route", {
//       status: 500
//     });
//   }
// }












import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages  } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", { status: 500 });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages
    });

    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.log('[CONVERSATION_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
