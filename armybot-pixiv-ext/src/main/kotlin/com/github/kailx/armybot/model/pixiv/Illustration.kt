package com.github.kailx.armybot.model.pixiv

import java.net.URI
import java.time.LocalDateTime

/**
 * @author KaiLx
 */
data class Illustration(val title: String,
                        val creator: String,
                        val caption: String,
                        val published: LocalDateTime,
                        val tags: List<Tag>,
                        val uri: URI)