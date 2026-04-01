import { Router } from "express"
import { FaceitService } from "./faceitservice"
import

const router = Router()
const faceit = new FaceitService()

router.get("/analyze", async (req, res) => {
    const { nickname } = req.query

    if (!nickname) {
        return res.status(400).json({ error: "Missing nickname" })
    }

    try {
        const player = await faceit.getPlayer(nickname as string)
        const history = await faceit.getMatchHistory(player.player_id)

        const matches = history.items.slice(0, 5)

        const stats = await Promise.all(
            matches.map((m: any) => faceit.getMatchStats(m.match_id))
        )

        res.json({ player, matches: stats })
    } catch (err) {
        res.status(500).json({ error: "Failed to analyze" })
    }
})

export default router 